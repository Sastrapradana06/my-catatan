import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("next-auth.session-token");
  const user = req.cookies.get("user");

  console.log("Cookies: ", { token, user });
  console.log("url: ", req.nextUrl.pathname);

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
  matcher: ["/", "/home", "/tulis-memo", "/memo/:id"],
};
