import { Metadata } from "next";
import Wrapper from "@/components/global/wrapper";
import Analysis from "@/components/marketing/analysis";
import Blog from "@/components/marketing/blog";
import Companies from "@/components/marketing/companies";
import CTA from "@/components/marketing/cta";
import Features from "@/components/marketing/features";
import Hero from "@/components/marketing/hero";
import Integration from "@/components/marketing/integration";
import LanguageSupport from "@/components/marketing/lang-support";
import Pricing from "@/components/marketing/pricing";

export const metadata: Metadata = {
    title: "ระบบออมทอง | ระบบออมทองออนไลน์ที่ดีที่สุดสำหรับร้านทอง",
    description: "บริการระบบออมทองออนไลน์ครบวงจร รองรับการซื้อขายทอง ออมทอง และบริหารจัดการร้านทองสมัยใหม่ ด้วยเทคโนโลยีล่าสุด ปลอดภัย ใช้งานง่าย ตลอด 24 ชั่วโมง",
    keywords: [
        "ระบบออมทอง",
        "ออมทอง",
        "ออมทองออนไลน์",
        "ระบบออมทองออนไลน์",
        "โปรแกรมออมทอง",
        "ระบบร้านทอง",
        "ซื้อขายทองออนไลน์",
        "ระบบจัดการร้านทอง",
        "แอพออมทอง",
        "ออมทองรายเดือน"
    ],
};

const HomePage = () => {
    return (
        <Wrapper className="py-20 relative">
            <Hero />
            <Companies />
            <Features />
            <Analysis />
            <Integration />
            <Pricing />
            <Blog />
            <LanguageSupport />
            <CTA />
        </Wrapper>
    )
};

export default HomePage;