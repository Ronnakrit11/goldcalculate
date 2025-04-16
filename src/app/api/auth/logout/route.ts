import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = cookies();
    (await cookieStore).delete("auth");
    
    return NextResponse.redirect(new URL("/login", "https://king-parkpanhang.vercel.app"));
}