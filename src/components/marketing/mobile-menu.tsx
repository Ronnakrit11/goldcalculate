"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NAV_LINKS } from "@/constants";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const MobileMenu = () => {
    const [open, setOpen] = useState(false);

    const handleLinkClick = () => {
        setOpen(false);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[300px] pt-12">
                <SheetHeader className="mb-8">
                    <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col space-y-4">
                    {NAV_LINKS.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-base font-medium transition-colors hover:text-primary"
                            onClick={handleLinkClick}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="pt-4 mt-4 border-t border-border">
                        <Link href="https://lin.ee/EO0xuyG" className="w-full" onClick={handleLinkClick}>
                            <Button className="w-full" variant="blue">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                </nav>
            </SheetContent>
        </Sheet>
    );
};

export default MobileMenu;