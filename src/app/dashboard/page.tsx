import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Container from "@/components/global/container";
import BlogEditor from "@/components/dashboard/blog-editor";
import BlogList from "@/components/dashboard/blog-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBlogPosts } from "@/lib/db";

export default async function DashboardPage() {
    const cookieStore = cookies();
    const auth = (await cookieStore).get("auth");

    if (!auth || auth.value !== "true") {
        redirect("/login");
    }

    const posts = await getBlogPosts();

    return (
        <main className="min-h-screen bg-background">
            <Container className="py-8">
                <div className="max-w-5xl mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold">Dashboard</h1>
                        <form action="/api/auth/logout" method="POST">
                            <button 
                                type="submit" 
                                className="text-sm text-red-500 hover:text-red-600"
                            >
                                Logout
                            </button>
                        </form>
                    </div>

                    <Tabs defaultValue="posts" className="w-full">
                        <TabsList className="mb-4">
                            <TabsTrigger value="posts">Blog Posts</TabsTrigger>
                            <TabsTrigger value="create">Create New Post</TabsTrigger>
                        </TabsList>
                        <TabsContent value="posts">
                            <BlogList posts={posts} />
                        </TabsContent>
                        <TabsContent value="create">
                            <BlogEditor />
                        </TabsContent>
                    </Tabs>
                </div>
            </Container>
        </main>
    );
}