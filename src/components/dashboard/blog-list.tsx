"use client";

import { BlogPost } from "@/lib/db";
import { format, parseISO } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlogEditor from "./blog-editor";

interface BlogListProps {
    posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [activeTab, setActiveTab] = useState("list");

    const handleDelete = async (slug: string) => {
        if (!confirm("Are you sure you want to delete this post?")) {
            return;
        }

        try {
            const response = await fetch(`/api/blog/delete?slug=${encodeURIComponent(slug)}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("Response was not JSON");
            }

            const data = await response.json();
            toast.success("Post deleted successfully");

            // Reload the page after successful deletion
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
            toast.error("Failed to delete post. Please try again.");
        }
    };

    const handleEdit = (post: BlogPost) => {
        setEditingPost(post);
        setActiveTab("edit");
    };

    const formatDate = (dateString: string) => {
        try {
            return format(parseISO(dateString), "MMM dd, yyyy");
        } catch (error) {
            console.error("Date formatting error:", error);
            return dateString;
        }
    };

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
                <TabsTrigger value="list">Posts List</TabsTrigger>
                <TabsTrigger value="edit" disabled={!editingPost}>Edit Post</TabsTrigger>
            </TabsList>

            <TabsContent value="list">
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
                                            {formatDate(post.created_at)}
                                        </td>
                                        <td className="px-4 py-2">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEdit(post)}
                                                    className="p-1 hover:text-primary transition-colors"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </button>
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
            </TabsContent>

            <TabsContent value="edit">
                {editingPost && (
                    <BlogEditor initialData={editingPost} onSuccess={() => setActiveTab("list")} />
                )}
            </TabsContent>
        </Tabs>
    );
}