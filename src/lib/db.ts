import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
}

export const sql = neon(process.env.DATABASE_URL);

export async function getBlogPosts() {
    try {
        const posts = await sql`
            SELECT * FROM blog_posts 
            ORDER BY created_at DESC
        `;
        return posts;
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

export async function getBlogPost(slug: string) {
    try {
        const [post] = await sql`
            SELECT * FROM blog_posts 
            WHERE slug = ${slug}
        `;
        return post || null;
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
}

export async function createBlogPost(post: {
    slug: string;
    title: string;
    description: string;
    content: string;
    excerpt: string;
    category: string;
    author?: string;
    image?: string;
    keywords: string[];
}) {
    try {
        const [newPost] = await sql`
            INSERT INTO blog_posts (
                slug, title, description, content, 
                excerpt, category, author, image, keywords
            ) VALUES (
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
            RETURNING *
        `;
        return newPost;
    } catch (error) {
        console.error('Error creating blog post:', error);
        throw error;
    }
}

export async function deleteBlogPost(slug: string) {
    try {
        await sql`
            DELETE FROM blog_posts 
            WHERE slug = ${slug}
        `;
        return true;
    } catch (error) {
        console.error('Error deleting blog post:', error);
        throw error;
    }
}