import { NAV_LINKS } from "@/constants";
import Link from "next/link";
import Wrapper from "../global/wrapper";
import { Button } from "../ui/button";
import MobileMenu from "./mobile-menu";

const Navbar = () => {
    return (
        <header className="sticky top-0 w-full h-16 bg-background/80 backdrop-blur-sm z-50">
            <Wrapper className="h-full">
                <div className="flex items-center justify-between h-full">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <span className="text-l font-semibold hidden lg:block">
                                จ่าคิง ปากพนัง
                            </span>
                        </Link>
                    </div>

                    <div className="hidden lg:flex items-center gap-4">
                        <ul className="flex items-center gap-8">
                            {NAV_LINKS.map((link, index) => (
                                <li key={index} className="text-sm font-medium -1 link">
                                    <Link href={link.href}>
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link href="https://line.me/ti/p/KZ7LA2n16R" className="hidden lg:block">
                            <Button variant="blue">
                               ติดต่อ
                            </Button>
                        </Link>
                        <MobileMenu />
                    </div>
                </div>
            </Wrapper>
        </header>
    )
};

export default Navbar;