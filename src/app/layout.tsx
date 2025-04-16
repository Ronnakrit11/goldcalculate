import "@/styles/globals.css";
import { cn } from "@/lib";
import { generateMetadata } from "@/utils";
import { base, heading, prompt, thai } from "@/constants";
import { Toaster } from "@/components/ui/sonner";
import Script from 'next/script';
export const metadata = generateMetadata();

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
             <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16843057102"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16843057102');
            gtag('event', 'conversion', {
      'send_to': 'AW-16843057102/raGHCOefsZYaEM7Pst8-',
      'value': 1.0,
      'currency': 'THB'
          `}
        </Script>
      </head>
            <body
                className={cn(
                    "min-h-screen bg-background text-foreground antialiased overflow-x-hidden !scrollbar-hide",
                    base.variable,
                    heading.variable,
                    prompt.variable,
                    thai.variable,
                )}
            >
                <Toaster richColors theme="dark" position="top-right" />
                {children}
            </body>
        </html>
    );
};