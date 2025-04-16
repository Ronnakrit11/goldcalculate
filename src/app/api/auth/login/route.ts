import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const formData = await request.formData();
    const password = formData.get("password");

    if (password === "1234") {
        // Set auth cookie
        (await
            // Set auth cookie
            cookies()).set("auth", "true", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 // 24 hours
        });

        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.redirect(new URL("/login?error=invalid", request.url));
}