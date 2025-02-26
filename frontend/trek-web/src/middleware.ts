/* eslint-disable @typescript-eslint/no-unused-vars */ //REMOVE THIS LATER
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    console.log("Dashboard accessed.")
    return NextResponse.next();
  }
  
  // Define which routes to protect
  export const config = {
    //probably also had to add the regular "/dashboard"
    matcher: ["/dashboard/:path*", "/dashboard"],
  };