import { Metadata } from "next";

interface MetadataProps {
    title?: string;
    description?: string;
    icons?: Metadata["icons"];
    noIndex?: boolean;
    noFollow?: boolean;
    noArchive?: boolean;
    noSnippet?: boolean;
    maxSnippet?: number;
    maxImagePreview?: 'none' | 'standard' | 'large';
    maxVideoPreview?: number;
    noTranslate?: boolean;
    noImageIndex?: boolean;
    keywords?: string[];
    author?: string;
    twitterHandle?: string;
    type?: "website" | "article" | "profile";
    locale?: string;
    alternates?: Record<string, string>;
    publishedTime?: string;
    modifiedTime?: string;
}

export const generateMetadata = ({
    title = `Aurienn บริการทำระบบซื้อขายทอง ระบบออมทองให้ร้านทองของคุณ`,
    description = `เปลี่ยนร้านทองของคุณให้ทันสมัยด้วยระบบซื้อขายและออมทองออนไลน์ที่ครบวงจร ใช้งานง่าย ปลอดภัย รองรับการทำงานตลอด 24 ชั่วโมง`,
    icons = [
        {
            rel: "icon",
            url: "/icons/Ar-logo.png",
            media: "(prefers-color-scheme: light)",
        },
        {
            rel: "icon",
            url: "/icons/Ar-logo.png",
            media: "(prefers-color-scheme: dark)",
        },
    ],
    noIndex = false,
    noFollow = false,
    noArchive = false,
    noSnippet = false,
    maxSnippet,
    maxImagePreview = 'large',
    maxVideoPreview,
    noTranslate = false,
    noImageIndex = false,
    keywords = [
        "ระบบออมทอง",
        "ระบบออมทองออนไลน์",
        "โปรเเกรมออมทองออนไลน์",
        "โปรเเกรมออมทอง",
        "ระบบซื้อขายทองออนไลน์",
        "ระบบออมทองอัตโนมัติ",
        "ระบบบริหารร้านทอง",
        "multilingual marketing",
        "Gold Trading",
        "ออมทอง",
    ],
    author = process.env.NEXT_PUBLIC_AUTHOR_NAME,
    type = "website",
}: MetadataProps = {}): Metadata => {
    const metadataBase = new URL(process.env.NEXT_PUBLIC_APP_URL || "https://www.aurienn.com");
    const imageUrl = "https://1qiwmugjmx.ufs.sh/f/JJLy8gppTqPnYt6unvQNAxnzvKiHT4fUXPyC8l1t9ZVQSpMr";

    // Construct robots directives
    const robotsDirectives = [
        'index',
        'follow',
        noArchive && 'noarchive',
        noSnippet && 'nosnippet',
        typeof maxSnippet === 'number' && `max-snippet:${maxSnippet}`,
        maxImagePreview && `max-image-preview:${maxImagePreview}`,
        typeof maxVideoPreview === 'number' && `max-video-preview:${maxVideoPreview}`,
        noTranslate && 'notranslate',
        noImageIndex && 'noimageindex'
    ].filter(Boolean).join(', ');

    return {
        metadataBase,
        title: {
            template: `%s | ${process.env.NEXT_PUBLIC_APP_NAME}`,
            default: title
        },
        description,
        keywords,
        authors: [{ name: author }],
        creator: author,
        publisher: process.env.NEXT_PUBLIC_APP_NAME,
        robots: robotsDirectives,
        openGraph: {
            type,
            title,
            description,
            siteName: process.env.NEXT_PUBLIC_APP_NAME,
            url: metadataBase,
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [imageUrl],
        },
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        icons,
        alternates: {
            canonical: metadataBase.toString(),
        },
    };
};