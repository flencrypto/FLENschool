import { NextRequest, NextResponse } from "next/server";
import {
  findUserByEmail,
  verifyPassword,
  signToken,
  toPublicUser,
  validateEmail,
  AUTH_COOKIE_NAME,
} from "@/lib/auth";

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Verifies credentials, sets an HttpOnly auth cookie, and returns the public user.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body as { email?: string; password?: string };

    if (!email || !validateEmail(email)) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }
    if (!password) {
      return NextResponse.json({ error: "Password is required." }, { status: 400 });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      // Use a generic message to avoid email enumeration
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const token = signToken(user);
    const res = NextResponse.json({ user: toPublicUser(user) });
    res.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Login failed. Please try again." }, { status: 500 });
  }
}
