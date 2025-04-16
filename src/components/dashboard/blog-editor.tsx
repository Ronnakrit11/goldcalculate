"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function BlogEditor() {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
        category: "",
        excerpt: "",
        keywords: "",
        image: "/images/feature-one.svg"
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/blog/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    keywords: formData.keywords.split(",").map(k => k.trim()),
                    date: new Date().toISOString()
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create blog post");
            }

            toast.success(data.message || "Blog post created successfully!");
            
            // Reset form
            setFormData({
                title: "",
                description: "",
                content: "",
                category: "",
                excerpt: "",
                keywords: "",
                image: "/images/feature-one.svg"
            });

            // Reload the page after successful creation
            setTimeout(() => {
                window.location.reload();
            }, 1500);

        } catch (error) {
            console.error("Error:", error);
            toast.error(error instanceof Error ? error.message : "Failed to create blog post");
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
                {loading ? "Creating..." : "Create Blog Post"}
            </Button>
        </form>
    );
}