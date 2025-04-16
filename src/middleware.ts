import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    // Check if the request is for the dashboard
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
        const auth = request.cookies.get("auth");
        
        if (!auth || auth.value !== "true") {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/dashboard/:path*"
};