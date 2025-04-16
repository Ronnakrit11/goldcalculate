"use client";

import { BlogPost } from "@/lib/blog";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface BlogListProps {
    posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
    const handleDelete = async (slug: string) => {
        if (!confirm("Are you sure you want to delete this post?")) {
            return;
        }

        try {
            const response = await fetch(`/api/blog/delete?slug=${slug}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete post");
            }

            toast.success("Post deleted successfully");
            // Refresh the page to update the list
            window.location.reload();
        } catch (error) {
            toast.error("Failed to delete post");
        }
    };

    return (
        <div className="rounded-lg border border-border">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border bg-muted/50">
                            <th className="px-4 py-2 text-left">Title</th>
                            <th className="px-4 py-2 text-left">Category</th>
                            <th className="px-4 py-2 text-left">Date</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post) => (
                            <tr key={post.slug} className="border-b border-border">
                                <td className="px-4 py-2">{post.title}</td>
                                <td className="px-4 py-2">{post.category}</td>
                                <td className="px-4 py-2">
                                    {format(new Date(post.date), "MMM dd, yyyy")}
                                </td>
                                <td className="px-4 py-2">
                                    <div className="flex items-center gap-2">
                                        <Link 
                                            href={`/blog/${post.slug}`}
                                            className="p-1 hover:text-primary transition-colors"
                                            target="_blank"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post.slug)}
                                            className="p-1 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}