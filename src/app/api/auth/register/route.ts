import { NextRequest, NextResponse } from "next/server";
import {
  createUser,
  signToken,
  toPublicUser,
  validateEmail,
  validateName,
  validatePassword,
  AUTH_COOKIE_NAME,
} from "@/lib/auth";

/**
 * POST /api/auth/register
 * Body: { name, email, password, role?, year? }
 * Creates a new user account, sets an auth cookie, and returns the public user.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role = "student", year } = body as {
      name?: string;
      email?: string;
      password?: string;
      role?: "student" | "parent" | "teacher";
      year?: number;
    };

    // Validate inputs
    if (!name || !validateName(name)) {
      return NextResponse.json({ error: "Name must be at least 2 characters." }, { status: 400 });
    }
    if (!email || !validateEmail(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }
    const pwCheck = validatePassword(password ?? "");
    if (!pwCheck.ok) {
      return NextResponse.json({ error: pwCheck.message }, { status: 400 });
    }
    if (!["student", "parent", "teacher"].includes(role)) {
      return NextResponse.json({ error: "Role must be student, parent, or teacher." }, { status: 400 });
    }
    const safeYear = year === 10 || year === 11 ? year : undefined;

    const user = await createUser(name, email, password!, role, safeYear);
    const token = signToken(user);

    const res = NextResponse.json({ user: toPublicUser(user) }, { status: 201 });
    res.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return res;
  } catch (err) {
    if (err instanceof Error && err.message === "EMAIL_TAKEN") {
      return NextResponse.json({ error: "An account with that email already exists." }, { status: 409 });
    }
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
  }
}
