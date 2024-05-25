import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  let cookie = req.cookies.get("next-auth.session-token");

  if (cookie == undefined) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/bookmark", "/tulis-memo", "/memo/:id"],
};
