import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")  

  if(!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}
  
  export const config = {
    //probably also had to add the regular "/dashboard"
    matcher: ["/dashboard/:path*", "/dashboard"],
  };