"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { BlogPost } from "@/lib/db";

interface BlogEditorProps {
    initialData?: BlogPost;
    onSuccess?: () => void;
}

export default function BlogEditor({ initialData, onSuccess }: BlogEditorProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        content: initialData?.content || "",
        category: initialData?.category || "",
        excerpt: initialData?.excerpt || "",
        keywords: initialData?.keywords?.join(", ") || "",
        image: initialData?.image || "/images/feature-one.svg"
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const endpoint = initialData 
                ? `/api/blog/update?slug=${encodeURIComponent(initialData.slug)}`
                : "/api/blog/create";
                
            const response = await fetch(endpoint, {
                method: initialData ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    keywords: formData.keywords.split(",").map(k => k.trim()),
                    date: new Date().toISOString()
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("Response was not JSON");
            }

            const data = await response.json();
            
            toast.success(initialData ? "Blog post updated successfully!" : "Blog post created successfully!");
            
            if (!initialData) {
                // Reset form for new posts
                setFormData({
                    title: "",
                    description: "",
                    content: "",
                    category: "",
                    excerpt: "",
                    keywords: "",
                    image: "/images/feature-one.svg"
                });
            }

            if (onSuccess) {
                onSuccess();
            }

            // Reload the page after successful creation/update
            window.location.reload();

        } catch (error) {
            console.error("Error:", error);
            toast.error(initialData ? "Failed to update blog post. Please try again." : "Failed to create blog post. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <Input
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Input
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Content (Markdown)</label>
                    <Textarea
                        value={formData.content}
                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                        rows={10}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <Input
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Excerpt</label>
                    <Input
                        value={formData.excerpt}
                        onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Keywords (comma-separated)</label>
                    <Input
                        value={formData.keywords}
                        onChange={(e) => setFormData(prev => ({ ...prev, keywords: e.target.value }))}
                        placeholder="keyword1, keyword2, keyword3"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <Input
                        value={formData.image}
                        onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                        required
                    />
                </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
                {loading ? (initialData ? "Updating..." : "Creating...") : (initialData ? "Update Blog Post" : "Create Blog Post")}
            </Button>
        </form>
    );
}