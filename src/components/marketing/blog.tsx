"use client";

import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Container from "../global/container";
import { Button } from "../ui/button";
import { MagicCard } from "../ui/magic-card";
import { useEffect, useState } from "react";
import { BlogPost } from "@/lib/blog";
import { format } from "date-fns";

const Blog = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    const fetchPosts = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/blog/featured', {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            });
            if (!response.ok) throw new Error('Failed to fetch posts');
            const data = await response.json();
            setPosts(data.posts);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();

        // Set up an interval to refresh the posts every 10 seconds
        const interval = setInterval(fetchPosts, 10000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const handlePostClick = (slug: string) => {
        router.push(`/blog/${encodeURIComponent(slug)}`);
    };

    const formatDate = (dateString: string) => {
        try {
            return format(new Date(dateString), "MMMM dd, yyyy");
        } catch (error) {
            return "Invalid date";
        }
    };

    return (
        <div id="blog" className="relative flex flex-col items-center justify-center w-full py-20">
            <Container>
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug">
                        Latest from our <span className="font-subheading italic">blog</span>
                    </h2>
                    <p className="text-base md:text-lg text-accent-foreground/80 mt-4">
                        Stay updated with the latest trends, insights, and best practices in AI-powered marketing automation.
                    </p>
                </div>
            </Container>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative w-full max-w-6xl mx-auto px-4">
                {isLoading ? (
                    Array.from({ length: 3 }).map((_, index) => (
                        <Container key={index} delay={0.1 + index * 0.1}>
                            <div className="animate-pulse">
                                <div className="bg-muted rounded-lg aspect-[16/9] mb-4"></div>
                                <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                                <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                                <div className="h-4 bg-muted rounded w-2/3"></div>
                            </div>
                        </Container>
                    ))
                ) : (
                    posts.map((post, index) => (
                        <Container key={post.slug} delay={0.1 + index * 0.1}>
                            <button 
                                onClick={() => handlePostClick(post.slug)}
                                className="block w-full text-left group"
                            >
                                <MagicCard
                                    gradientFrom="#38bdf8"
                                    gradientTo="#3b82f6"
                                    className="p-4 lg:p-6 w-full overflow-hidden"
                                    gradientColor="rgba(59,130,246,0.1)"
                                >
                                    <div className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                        <span>{formatDate(post.date)}</span>
                                        <span>•</span>
                                        <span>{post.readingTime} min read</span>
                                    </div>
                                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 mb-3">
                                        {post.category}
                                    </span>
                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        {post.description}
                                    </p>
                                </MagicCard>
                            </button>
                        </Container>
                    ))
                )}
            </div>

            <Container delay={0.4}>
                <Button 
                    onClick={() => router.push('/blog')}
                    size="lg" 
                    className="group mt-12"
                >
                    View all posts
                    <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
            </Container>
        </div>
    );
};

export default Blog;