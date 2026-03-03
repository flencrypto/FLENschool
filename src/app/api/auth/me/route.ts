import { NextRequest, NextResponse } from "next/server";
import { verifyToken, findUserById, toPublicUser, AUTH_COOKIE_NAME } from "@/lib/auth";

/**
 * GET /api/auth/me
 * Returns the currently authenticated user from the JWT cookie.
 * Returns 401 if no valid token is present.
 */
export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Session expired. Please log in again." }, { status: 401 });
  }

  const user = await findUserById(payload.sub);
  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  return NextResponse.json({ user: toPublicUser(user) });
}
