import Container from "@/components/global/container";
import { getBlogPosts } from "@/lib/blog";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog - AI Marketing Insights & Strategies",
    description: "Explore the latest insights on AI-powered marketing automation, content creation, and digital marketing strategies.",
    keywords: ["AI marketing", "digital marketing", "content creation", "marketing automation", "ROI optimization"],
};

export default async function BlogPage() {
    const posts = await getBlogPosts();

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "MMMM dd, yyyy");
        } catch (error) {
            return "Invalid date";
        }
    };

    return (
        <Container className="py-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Latest Marketing Insights</h1>
                <div className="space-y-12">
                    {posts.map((post) => (
                        <article key={post.slug} className="border-b border-border pb-12">
                            <Link href={`/blog/${post.slug}`} className="group">
                                <div className="relative w-full aspect-[2/1] mb-6 rounded-xl overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h2>
                            </Link>
                            <div className="flex items-center gap-4 text-muted-foreground mb-4">
                                <span>{post.author}</span>
                                <span>•</span>
                                <time dateTime={post.date}>
                                    {formatDate(post.date)}
                                </time>
                                <span>•</span>
                                <span>{post.readingTime} min read</span>
                                <span>•</span>
                                <span className="capitalize">{post.category}</span>
                            </div>
                            <p className="text-muted-foreground">{post.excerpt}</p>
                        </article>
                    ))}
                </div>
            </div>
        </Container>
    );
}