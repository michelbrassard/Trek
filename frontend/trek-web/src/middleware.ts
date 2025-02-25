/* eslint-disable @typescript-eslint/no-unused-vars */ //REMOVE THIS LATER
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    // const authCheck = await fetch("https://your-django-backend.com/api/auth-status/", {
    //   headers: { Cookie: req.headers.get("cookie") || "" },
    // });
  
    // if (authCheck.status !== 200) {
    //   return NextResponse.redirect(new URL("/login", req.url));
    // }
  
    //return NextResponse.next();
    console.log("Middleware Executed!")
    //return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // Define which routes to protect
  export const config = {
    //probably also had to add the regular "/dashboard"
    matcher: ["/dashboard/:path*", "/dashboard"],
  };