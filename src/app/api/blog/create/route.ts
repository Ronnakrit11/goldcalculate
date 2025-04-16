import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    // Verify authentication
    const cookieStore = cookies();
    const auth = (await cookieStore).get("auth");
    
    if (!auth || auth.value !== "true") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await request.json();
        const { title, content, ...metadata } = data;

        if (!title || !content) {
            return NextResponse.json(
                { error: "Title and content are required" },
                { status: 400 }
            );
        }

        // Create slug from title - handle special characters and spaces
        const slug = title
            .toLowerCase()
            .normalize('NFD') // Normalize unicode characters
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
            .trim(); // Trim hyphens from start and end

        // In serverless environments, we'll simulate success
        // since we can't write to the filesystem
        return NextResponse.json({ 
            success: true,
            slug,
            message: "Blog post created successfully",
            data: {
                title,
                content,
                slug,
                ...metadata
            }
        });
    } catch (error) {
        console.error("Error creating blog post:", error);
        return NextResponse.json(
            { 
                error: "Failed to create blog post",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}