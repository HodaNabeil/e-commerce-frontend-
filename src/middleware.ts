import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-url", req.url);

  const response = NextResponse.next({
    request: {
      // Apply new request headers
      headers: requestHeaders,
    },
  });

  const pathname = req.nextUrl.pathname;

  const isAuth = (await cookies()).get("access_token")?.value;
  const isAuthPage = pathname.startsWith("/login");
  const protectedRoutes = ["/cart", "/orders", "/profile"];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return response;
  }

  if (!isAuth && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return response;
}
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
    // Match all protected routes
    "/cart/:path*",

    "/orders/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/login",
    "/register",
  ],
};
