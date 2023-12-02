import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  console.log("middleware running");
  const token = await getToken({ req });
  const isAuth = !!token;
  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/register");

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/myrecipes/all", req.url));
    }

    return null;
  }

  if (!isAuth) {
    let from = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      from += req.nextUrl.search;
    }

    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, req.url),
    );
  }
}

export const config = {
  matcher: ["/myrecipes/:path*", "/login", "/register"],
};
