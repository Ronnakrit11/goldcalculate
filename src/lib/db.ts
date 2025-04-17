import { neon } from '@neondatabase/serverless';
import { PrismaClient } from '@prisma/client';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
}

export const sql = neon(process.env.DATABASE_URL);

// Initialize Prisma Client
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

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
        const posts = await prisma.blogPost.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        
        // Convert to the expected format
        return posts.map(post => ({
            ...post,
            created_at: post.createdAt.toISOString(),
            updated_at: post.updatedAt.toISOString()
        })) as BlogPost[];
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
        const post = await prisma.blogPost.findUnique({
            where: {
                slug: slug
            }
        });

        if (!post) return null;

        // Convert to the expected format
        return {
            ...post,
            created_at: post.createdAt.toISOString(),
            updated_at: post.updatedAt.toISOString()
        } as BlogPost;
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
}

export type CreateBlogPostInput = Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>;

export async function createBlogPost(post: CreateBlogPostInput): Promise<BlogPost> {
    try {
        const newPost = await prisma.blogPost.create({
            data: {
                slug: post.slug,
                title: post.title,
                description: post.description,
                content: post.content,
                excerpt: post.excerpt,
                category: post.category,
                author: post.author || 'Aurienn Team',
                image: post.image || '/images/feature-one.svg',
                keywords: post.keywords
            }
        });

        // Convert to the expected format
        return {
            ...newPost,
            created_at: newPost.createdAt.toISOString(),
            updated_at: newPost.updatedAt.toISOString()
        } as BlogPost;
    } catch (error) {
        console.error('Error creating blog post:', error);
        throw error;
    }
}

export async function updateBlogPost(slug: string, post: Partial<CreateBlogPostInput>): Promise<BlogPost> {
    try {
        const updatedPost = await prisma.blogPost.update({
            where: {
                slug: slug
            },
            data: {
                title: post.title,
                description: post.description,
                content: post.content,
                excerpt: post.excerpt,
                category: post.category,
                image: post.image,
                keywords: post.keywords
            }
        });

        // Convert to the expected format
        return {
            ...updatedPost,
            created_at: updatedPost.createdAt.toISOString(),
            updated_at: updatedPost.updatedAt.toISOString()
        } as BlogPost;
    } catch (error) {
        console.error('Error updating blog post:', error);
        throw error;
    }
}

export async function deleteBlogPost(slug: string): Promise<void> {
    try {
        await prisma.blogPost.delete({
            where: {
                slug: slug
            }
        });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        throw error;
    }
}