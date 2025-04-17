import { updateBlogPost } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
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
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get("slug");

        if (!slug) {
            return NextResponse.json(
                { error: "Slug is required" },
                { 
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        }

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

        const post = await updateBlogPost(slug, {
            title,
            content,
            ...metadata
        });

        return NextResponse.json({ 
            success: true,
            message: "Blog post updated successfully",
            data: post
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error updating blog post:", error);
        return NextResponse.json(
            { 
                error: "Failed to update blog post",
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