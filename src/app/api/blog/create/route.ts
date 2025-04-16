import { createBlogPost } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    // Verify authentication
    const cookieStore = cookies();
    const auth = (await cookieStore).get("auth");
    
    if (!auth || auth.value !== "true") {
        return NextResponse.json(
            { error: "Unauthorized" }, 
            { 
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }

    try {
        const data = await request.json();
        const { title, content, ...metadata } = data;

        if (!title || !content) {
            return NextResponse.json(
                { error: "Title and content are required" },
                { 
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
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

        const post = await createBlogPost({
            title,
            content,
            slug,
            author: "Aurienn Team",
            ...metadata
        });

        return NextResponse.json({ 
            success: true,
            message: "Blog post created successfully",
            data: post
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error creating blog post:", error);
        return NextResponse.json(
            { 
                error: "Failed to create blog post",
                details: error instanceof Error ? error.message : "Unknown error"
            },
            { 
                status: 500,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}