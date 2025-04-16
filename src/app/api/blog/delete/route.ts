import { deleteBlogPost } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
    // Verify authentication
    const cookieStore = cookies();
    const auth = (await cookieStore).get("auth");
    
    if (!auth || auth.value !== "true") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get("slug");

        if (!slug) {
            return NextResponse.json(
                { error: "Slug is required" },
                { status: 400 }
            );
        }

        await deleteBlogPost(slug);

        return NextResponse.json({ 
            success: true,
            message: "Blog post deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting blog post:", error);
        return NextResponse.json(
            { 
                error: "Failed to delete blog post",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}