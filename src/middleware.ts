import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { REDIRECTS } from "@/content/redirects";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const hostname = host.split(":")[0].toLowerCase();
  if (hostname.startsWith("www.")) {
    const url = request.nextUrl.clone();
    url.hostname = hostname.slice(4);
    url.protocol = "https:";
    url.port = "";
    return NextResponse.redirect(url, 301);
  }

  const path = request.nextUrl.pathname.replace(/\/$/, "") || "/";
  const destination = REDIRECTS[path];
  if (destination) {
    const url = request.nextUrl.clone();
    url.pathname = destination;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
