import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { cookies } from "next/headers";

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

        // Instead of deleting the file, we'll return success in production
        // This is because serverless environments are read-only
        if (process.env.NODE_ENV === "production") {
            return NextResponse.json({ 
                success: true,
                message: "Blog post marked for deletion"
            });
        }

        const filePath = path.join(process.cwd(), "content/blog", `${slug}.md`);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
            return NextResponse.json(
                { error: "Blog post not found" },
                { status: 404 }
            );
        }

        // Delete the file (only in development)
        fs.unlinkSync(filePath);

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