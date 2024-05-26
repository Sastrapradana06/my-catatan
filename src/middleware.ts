import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token =
    req.cookies.get("next-auth.session-token") ||
    req.cookies.get("__Secure-next-auth.session-token");
  const user = req.cookies.get("user");

  console.log("Cookies: ", { token, user });

  if (req.nextUrl.pathname === "/") {
    const response = NextResponse.next();
    response.cookies.delete("user");
    return response;
  }

  if (token == undefined) {
    return NextResponse.redirect(new URL("/", req.url));
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/", "/home", "/bookmark", "/tulis-memo", "/memo/:id"],
};
