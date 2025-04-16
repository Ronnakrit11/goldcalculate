import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    // Verify authentication
    const cookieStore = cookies();
    const auth = (await cookieStore).get("auth");
    
    if (!auth || auth.value !== "true") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const data = await request.json();
        const { title, content, ...metadata } = data;

        // Create markdown content
        const markdown = `---
title: "${title}"
description: "${metadata.description}"
date: "${metadata.date}"
category: "${metadata.category}"
excerpt: "${metadata.excerpt}"
author: "Aurienn Team"
image: "${metadata.image}"
keywords: ${JSON.stringify(metadata.keywords)}
---

${content}`;

        // Create slug from title
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, "")
            .replace(/\s+/g, "-");

        // Save to file
        const filePath = path.join(process.cwd(), "content/blog", `${slug}.md`);
        fs.writeFileSync(filePath, markdown);

        return NextResponse.json({ success: true, slug });
    } catch (error) {
        console.error("Error creating blog post:", error);
        return NextResponse.json(
            { error: "Failed to create blog post" },
            { status: 500 }
        );
    }
}