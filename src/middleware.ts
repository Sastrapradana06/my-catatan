import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token");
  const user = req.cookies.get("user");

  console.log("Cookies: ", { token, user });

  // if (cookie == undefined) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/bookmark", "/tulis-memo", "/memo/:id"],
};
