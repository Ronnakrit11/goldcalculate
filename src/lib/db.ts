import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
}

export const sql = neon(process.env.DATABASE_URL);

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    description: string;
    content: string;
    excerpt: string;
    category: string;
    author: string;
    image: string;
    keywords: string[];
    created_at: string;
    updated_at: string;
    readingTime?: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    try {
        const posts = await sql`
            SELECT 
                id,
                slug,
                title,
                description,
                content,
                excerpt,
                category,
                author,
                image,
                keywords,
                created_at,
                updated_at
            FROM blog_posts 
            ORDER BY created_at DESC
        `;
        return posts as BlogPost[] || [];
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
        const posts = await sql`
            SELECT 
                id,
                slug,
                title,
                description,
                content,
                excerpt,
                category,
                author,
                image,
                keywords,
                created_at,
                updated_at
            FROM blog_posts 
            WHERE slug = ${slug}
        `;
        const post = posts[0] as BlogPost;
        return post || null;
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
}

export type CreateBlogPostInput = Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>;

export async function createBlogPost(post: CreateBlogPostInput): Promise<BlogPost> {
    try {
        const posts = await sql`
            INSERT INTO blog_posts (
                id,
                slug,
                title,
                description,
                content,
                excerpt,
                category,
                author,
                image,
                keywords
            ) VALUES (
                gen_random_uuid(),
                ${post.slug},
                ${post.title},
                ${post.description},
                ${post.content},
                ${post.excerpt},
                ${post.category},
                ${post.author || 'Aurienn Team'},
                ${post.image || '/images/feature-one.svg'},
                ${post.keywords}
            )
            RETURNING 
                id,
                slug,
                title,
                description,
                content,
                excerpt,
                category,
                author,
                image,
                keywords,
                created_at,
                updated_at
        `;

        const newPost = posts[0] as BlogPost;
        if (!newPost) {
            throw new Error('Failed to create blog post');
        }

        return newPost;
    } catch (error) {
        console.error('Error creating blog post:', error);
        throw error;
    }
}

export async function deleteBlogPost(slug: string): Promise<void> {
    try {
        await sql`
            DELETE FROM blog_posts 
            WHERE slug = ${slug}
        `;
    } catch (error) {
        console.error('Error deleting blog post:', error);
        throw error;
    }
}