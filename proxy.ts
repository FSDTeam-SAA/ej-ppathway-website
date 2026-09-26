import { NextResponse, type NextRequest } from "next/server";
import { ADVISOR_ONLY_MODE, isPublished } from "./app/lib/publicRoutes";

const PUBLIC_ASSET = /\.(?:png|jpe?g|gif|svg|webp|ico|css|js|mjs|woff2?|ttf|eot|map)$/i;

export function proxy(request: NextRequest) {
  if (!ADVISOR_ONLY_MODE) return NextResponse.next();

  const pathname = request.nextUrl.pathname;
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/join-as-advisor", request.url), 302);
  }

  if (pathname.startsWith("/_next/") || pathname === "/favicon.ico" || PUBLIC_ASSET.test(pathname)) {
    return NextResponse.next();
  }

  if (isPublished(pathname)) return NextResponse.next();

  return new Response("Not Found", { status: 404 });
}

export const config = {
  matcher: "/:path*",
};
