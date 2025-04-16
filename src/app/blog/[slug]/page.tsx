import { getBlogPost } from "@/lib/blog";
import { format } from "date-fns";
import Markdown from "markdown-to-jsx";
import { notFound } from "next/navigation";
import Container from "@/components/global/container";
import Wrapper from "@/components/global/wrapper";
import { Metadata } from "next";
import Image from "next/image";

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Force dynamic rendering for blog postss
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const post = await getBlogPost(decodeURIComponent(resolvedParams.slug));

    if (!post) {
        return {
            title: "Blog Post Not Found",
            description: "The requested blog post could not be found.",
        };
    }

    return {
        title: post.title,
        description: post.description,
        keywords: post.keywords,
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            publishedTime: post.date,
            authors: [post.author],
            images: [post.image],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: [post.image],
        },
    };
}
export default async function BlogPostPage({ params, searchParams }: PageProps) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const post = await getBlogPost(decodeURIComponent(resolvedParams.slug));

    if (!post) {
        notFound();
    }
    return (
        <Wrapper>
            <Container className="py-20">
                <article className="prose prose-invert mx-auto">
                    <div className="mb-8">
                        <div className="relative w-full aspect-[2/1] mb-8 rounded-xl overflow-hidden">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <h1 className="text-4xl font-bold mb-4 font-prompt">{post.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                            <span>{post.author}</span>
                            <span>•</span>
                            <time dateTime={post.date}>
                                {format(new Date(post.date), "MMMM dd, yyyy")}
                            </time>
                            <span>•</span>
                            <span>{post.readingTime} min read</span>
                            <span>•</span>
                            <span className="capitalize">{post.category}</span>
                        </div>
                    </div>
                    <div className="prose prose-invert max-w-none">
                        <Markdown 
                            className="prose prose-invert max-w-none font-prompt"
                            options={{
                                overrides: {
                                    h1: {
                                        props: {
                                            className: 'text-3xl font-bold mt-8 mb-4 font-prompt',
                                        },
                                    },
                                    h2: {
                                        props: {
                                            className: 'text-2xl font-bold mt-6 mb-4 font-prompt',
                                        },
                                    },
                                    h3: {
                                        props: {
                                            className: 'text-xl font-bold mt-4 mb-2 font-prompt',
                                        },
                                    },
                                    p: {
                                        props: {
                                            className: 'my-4 leading-relaxed font-prompt',
                                        },
                                    },
                                    ul: {
                                        props: {
                                            className: 'list-disc list-inside my-4 space-y-2 font-prompt',
                                        },
                                    },
                                    ol: {
                                        props: {
                                            className: 'list-decimal list-inside my-4 space-y-2 font-prompt',
                                        },
                                    },
                                    li: {
                                        props: {
                                            className: 'font-prompt',
                                        },
                                    },
                                },
                            }}
                        >
                            {post.content}
                        </Markdown>
                    </div>
                </article>
            </Container>
        </Wrapper>
    );
}