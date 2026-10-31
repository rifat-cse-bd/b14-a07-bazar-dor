import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Optimistic check: only looks for the session cookie. Pages verify the session themselves.
export function proxy(request) {
  if (getSessionCookie(request)) {
    return NextResponse.next();
  }

  const signInUrl = new URL("/signin", request.url);
  signInUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
  signInUrl.searchParams.set("reason", "protected");
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: ["/product/:path*", "/profile/:path*"],
};
