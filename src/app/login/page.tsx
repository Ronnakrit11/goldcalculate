import { redirect } from "next/navigation";
import Container from "@/components/global/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function LoginPage() {
    return (
        <Container className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-6 bg-card rounded-lg border border-border">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
                <form action="/api/auth/login" method="POST">
                    <div className="space-y-4">
                        <Input 
                            type="password" 
                            name="password"
                            placeholder="Enter password"
                            required
                        />
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </Container>
    );
}