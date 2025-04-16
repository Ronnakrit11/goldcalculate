import { DownloadIcon, FilterIcon, TrendingUpIcon } from "lucide-react";
import Image from "next/image";
import Container from "../global/container";
import { Button } from "../ui/button";
import { MagicCard } from "../ui/magic-card";

const Analysis = () => {
    return (
        <div className="relative flex flex-col items-center justify-center w-full py-20">
            <Container>
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug">
                        รู้ทุกการเคลื่อนไหวราคาทอง  <br /><span className="font-subheading italic">ทุกวินาที</span>
                    </h2>
                    <p className="text-base md:text-lg text-accent-foreground/80 mt-4">
                        ให้ลูกค้าของคุณไม่พลาดทุกการเคลื่อนไหวราคา ตอบโจทย์ลูกค้ายุคใหม่ ซื้อขายทอง ออมทอง ได้ทุกที่ ทุกเวลา.
                    </p>
                </div>
            </Container>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative w-full">
                <Container delay={0.2}>
                    <div className="rounded-2xl bg-background/40 relative border border-border/50">
                        <MagicCard
                            gradientFrom="#38bdf8"
                            gradientTo="#3b82f6"
                            gradientColor="rgba(59,130,246,0.1)"
                            className="p-4 lg:p-8 w-full overflow-hidden"
                        >
                            <div className="absolute bottom-0 right-0 bg-blue-500 w-1/4 h-1/4 blur-[8rem] z-20"></div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold">
                                    Transections Insights
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    ติดตามทุกการเคลื่อนไหวของพอร์ตได้เเบบเรียลไทม์.
                                </p>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-baseline">
                                        <div>
                                            <div className="text-3xl font-semibold">
                                                12,834 ฿
                                            </div>
                                            <div className="text-sm text-green-500 flex items-center gap-1 mt-2">
                                                <TrendingUpIcon className="w-4 h-4" />
                                                +25% Profits
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="icon" variant="ghost">
                                                <FilterIcon className="w-5 h-5" />
                                            </Button>
                                            <Button size="icon" variant="ghost">
                                                <DownloadIcon className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="grid grid-cols-4 text-sm text-muted-foreground py-2">
                                            <div>Assets</div>
                                            <div>Status</div>
                                            <div>Value</div>
                                            <div>Profits/Loss</div>
                                        </div>
                                        {[
                                            { name: "GoldSpot", status: "Sell", reach: "45K", roi: "+32%" },
                                            { name: "Gold 99.9%", status: "Sell", reach: "28K", roi: "+18%" },
                                            { name: "Gold 96.5%", status: "Sell", reach: "62K", roi: "+45%" },
                                        ].map((campaign) => (
                                            <div key={campaign.name} className="grid grid-cols-4 text-sm py-2 border-t border-border/50">
                                                <div>{campaign.name}</div>
                                                <div>{campaign.status}</div>
                                                <div>{campaign.reach}</div>
                                                <div className="font-semibold">{campaign.roi}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </MagicCard>
                    </div>
                </Container>

                <Container delay={0.2}>
                    <div className="rounded-2xl bg-background/40 relative border border-border/50">
                        <MagicCard
                            gradientFrom="#38bdf8"
                            gradientTo="#3b82f6"
                            gradientColor="rgba(59,130,246,0.1)"
                            className="p-4 lg:p-8 w-full overflow-hidden"
                        >
                            <div className="absolute bottom-0 right-0 bg-sky-500 w-1/4 h-1/4 blur-[8rem] z-20"></div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold">
                                    Assets Metrics
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Growth of Customer Assets
                                </p>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-baseline">
                                        <div>
                                            <div className="text-3xl font-semibold">84,392 ฿</div>
                                            <div className="text-sm text-green-500 flex items-center gap-1 mt-2">
                                                <TrendingUpIcon className="w-4 h-4" />
                                                +12% Asset Holding
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="icon" variant="ghost">
                                                <FilterIcon className="w-5 h-5" />
                                            </Button>
                                            <Button size="icon" variant="ghost">
                                                <DownloadIcon className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="grid grid-cols-4 text-sm text-muted-foreground py-2">
                                            <div>Assets</div>
                                            <div>Volumn</div>
                                            <div>Value</div>
                                            <div>Growth Rate</div>
                                        </div>
                                        {[
                                            { channel: "GoldSpot", users: "10", sessions: "45K", rate: "3.2%" },
                                            { channel: "Gold 99.9%", users: "5 BathGold", sessions: "36K", rate: "4.5%" },
                                            { channel: "Gold 96.5%", users: "5 BathGold", sessions: "22K", rate: "5.1%" },
                                        ].map((metric) => (
                                            <div key={metric.channel} className="grid grid-cols-4 text-sm py-2 border-t border-border/50">
                                                <div>{metric.channel}</div>
                                                <div>{metric.users}</div>
                                                <div>{metric.sessions}</div>
                                                <div className="font-semibold">{metric.rate}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </MagicCard>
                    </div>
                </Container>
            </div>

            {/* Features Section */}
            <Container className="mt-20">
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug">
                        ฟังก์ชั่นทั้งหมดของ<span className="font-subheading italic">ระบบออมทอง</span>
                    </h2>
                    <p className="text-base md:text-lg text-accent-foreground/80 mt-4">
                        ระบบออมทองออนไลน์ที่ครบวงจร รองรับการซื้อขายทอง ออมทองรายเดือน และบริหารจัดการร้านทองสมัยใหม่ ด้วยเทคโนโลยีล่าสุด
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            title: "ระบบจัดการสมาชิกออมทอง",
                            image: "/images/feature5.png",
                            features: [
                                "สมัครสมาชิกออมทองออนไลน์ง่ายๆ",
                                "ยืนยันตัวตน KYC มาตรฐานสากล",
                                "จัดการข้อมูลสมาชิกออมทองครบวงจร",
                                "กำหนดสิทธิ์การใช้งานหลายระดับ"
                            ]
                        },
                        {
                            title: "ระบบซื้อขายทองออนไลน์",
                            image: "/images/feature2.png",
                            features: [
                                "ซื้อขายทองออนไลน์ 24 ชั่วโมง",
                                "แจ้งเตือนคำสั่งซื้อขายทองทันทีผ่าน telegrame bot",
                                "ตรวจสอบสลิปโอนเงินอัตโนมัติ",
                                "รายงานซื้อขายทองแบบเรียลไทม์"
                            ]
                        },
                        {
                            title: "ระบบออมทองรายเดือน",
                            image: "/images/feature-three.svg",
                            features: [
                                "ออมทองรายเดือนอัตโนมัติผ่านระบบ", 
                                "ติดตามมูลค่าทองคำแบบเรียลไทม์",
                                "แจ้งเตือนครบกำหนดออมทองประจำเดือน",
                                "สรุปผลการออมทองรายบุคคล"
                            ]
                        },
                        {
                            title: "ระบบจัดการราคาทองคำ",
                            image: "/images/feature4.png",
                            features: [
                                "อัพเดทราคาทองคำอัตโนมัติ",
                                "ตั้งค่าส่วนต่างราคาทองได้",
                                "กำหนดราคารับซื้อ-ขายทองแบบยืดหยุ่น",
                                "แจ้งเตือนราคาทองเคลื่อนไหวทันที"
                            ]
                        },
                        {
                            title: "ระบบรายงานออมทอง",
                            image: "/images/feature3.png",
                            features: [
                                "รายงานยอดออมทองประจำวัน",
                                "สรุปการออมทองรายบุคคล",
                                "วิเคราะห์กำไร-ขาดทุนการออมทอง",
                                "ส่งออกรายงานออมทองหลายรูปแบบ"
                            ]
                        },
                        {
                            title: "ระบบความปลอดภัยออมทอง",
                            image: "/images/feature6.png",
                            features: [
                                "ระบบยืนยันตัวตน 2 ชั้น (2FA)",
                                "เข้ารหัสข้อมูลออมทองแบบ End-to-End",
                                "สำรองข้อมูลออมทองอัตโนมัติ",
                                "เข้าระบบออมทองได้หลายอุปกรณ์"
                            ]
                        }
                    ].map((section, index) => (
                        <Container key={section.title} delay={0.1 * index}>
                            <div className="rounded-xl bg-gradient-to-b from-[#0A0A0B] to-[#0A0A0B]/95 relative border border-white/[0.08] p-6 h-full shadow-xl overflow-hidden group hover:border-blue-500/50 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-0 right-0 bg-blue-500 w-1/4 h-1/4 blur-[8rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"></div>
                                
                                <div className="relative w-full h-40 mb-6 group-hover:scale-105 transition-transform duration-300">
                                    <Image
                                        src={section.image}
                                        alt={`${section.title} - ระบบออมทองออนไลน์`}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                
                                <div className="relative">
                                    <h3 className="text-xl font-medium text-white/90 mb-4 group-hover:text-white transition-colors duration-300">{section.title}</h3>
                                    <ul className="space-y-2">
                                        {section.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-2 text-white/60 group-hover:text-white/80 transition-colors duration-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#007AFF] group-hover:bg-blue-400 transition-colors duration-300"></div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Container>
                    ))}
                </div>
            </Container>
        </div>
    )
};

export default Analysis;
