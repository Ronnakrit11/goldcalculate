import {
    ChartColumnBigIcon,
    DatabaseIcon,
    TrendingUpIcon,
    WandSparklesIcon,
    ZapIcon
} from "lucide-react";

export const FEATURES = [
    {
        title: "ระบบออมทองที่ปลอดภัยสูงสุด",
        description: "ออมทองอย่างมั่นใจด้วยระบบออมทองที่มีความปลอดภัยสูงสุด พร้อมระบบ 2FA ช่วยป้องกันข้อมูลและการทำธุรกรรมทุกขั้นตอน",
        icon: WandSparklesIcon,
        image: "/images/feature-two.svg",
    },
    {
        title: "ราคาทองอัปเดตเรียลไทม์สำหรับการออมทอง",
        description: "ติดตามราคาทองแบบเรียลไทม์ผ่านระบบออมทอง พร้อมกราฟและ Indicator ช่วยให้การซื้อขายทองและการออมทองแม่นยำยิ่งขึ้น",
        icon: ChartColumnBigIcon,
        image: "/images/feature-one.svg",
    },
    {
        title: "ตั้งราคาทองง่ายในระบบออมทอง",
        description: "ระบบออมทองช่วยให้คุณสามารถตั้งราคา Bid Offer ได้เองสำหรับทุกสินค้าทองคำ สะดวกและรวดเร็ว",
        icon: DatabaseIcon,
        image: "/images/feature-three.svg",
    },
    {
        title: "คำนวณต้นทุนออมทองได้ครบถ้วน",
        description: "ระบบออมทองช่วยให้คุณรู้ต้นทุนรวม ต้นทุนเฉลี่ย และตัวเลขสำคัญอื่นๆ ช่วยให้การวางแผนการออมทองแม่นยำขึ้น",
        icon: TrendingUpIcon,
        image: "/images/feature-four.svg",
    },
    {
        title: "ติดตามทุกธุรกรรมในระบบออมทอง",
        description: "ระบบออมทองของเราช่วยให้คุณติดตามทุกการซื้อขายทองและการออมทองได้อย่างละเอียด มั่นใจในทุกขั้นตอน",
        icon: ZapIcon,
        image: "/images/feature-five.svg",
    }
]
