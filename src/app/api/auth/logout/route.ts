import { NextResponse } from "next/server";
import { AUTH_COOKIE_NAME } from "@/lib/auth";

/**
 * POST /api/auth/logout
 * Clears the auth cookie.
 */
export async function POST() {
  const res = NextResponse.json({ message: "Logged out successfully." });
  res.cookies.set(AUTH_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
