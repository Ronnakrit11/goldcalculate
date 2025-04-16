import { getBlogPosts } from "@/lib/blog";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const headersList = headers();
        
        const allPosts = await getBlogPosts();
        // Get the 3 most recent posts
        const featuredPosts = allPosts.slice(0, 3);

        return new NextResponse(JSON.stringify({ posts: featuredPosts }), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
            },
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
    }
}