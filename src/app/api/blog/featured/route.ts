import { getBlogPosts } from "@/lib/blog";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const allPosts = await getBlogPosts();
        // Get the 3 most recent posts
        const featuredPosts = allPosts.slice(0, 3);

        return NextResponse.json({ posts: featuredPosts });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
    }
}