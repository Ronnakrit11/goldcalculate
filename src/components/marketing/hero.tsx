"use client";

import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "../global/container";
import Icons from "../global/icons";
import { Button } from "../ui/button";
import { OrbitingCircles } from "../ui/orbiting-circles";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";

interface GoldPrice {
    bid: number | null;
    ask: number | null;
    diff: string | null;
}

interface GoldPrices {
    gold9999: GoldPrice;
    gold965: GoldPrice;
    timestamp: string;
}

const goldTypes = [
    { value: "96.5", label: "ทองสมาคม" },
    { value: "99.99", label: "ทองคำ 99.99%" }
];

const Hero = () => {
    const [goldPrices, setGoldPrices] = useState<GoldPrices | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Calculator state
    const [selectedGoldType, setSelectedGoldType] = useState<string>("96.5");
    const [goldWeight, setGoldWeight] = useState<string>("1");
    const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

    useEffect(() => {
        const fetchGoldPrice = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await fetch('/api/gold-price');
                if (!response.ok) throw new Error('Failed to fetch gold price');
                const data = await response.json();
                setGoldPrices(data);
            } catch (error) {
                console.error("Error fetching gold price:", error);
                setError(error instanceof Error ? error.message : 'Failed to fetch gold price');
            } finally {
                setIsLoading(false);
            }
        };

        fetchGoldPrice();
        const interval = setInterval(fetchGoldPrice, 30000); // Update every 30 seconds

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!goldPrices) return;

        const currentGoldPrice = selectedGoldType === "99.99" ? goldPrices.gold9999 : goldPrices.gold965;
        
        if (currentGoldPrice?.ask) {
            const weight = parseFloat(goldWeight) || 0;
            
            let calculatedPrice;
            if (selectedGoldType === "96.5" && currentGoldPrice.bid !== null) {
                // Formula for 96.5% gold: (ราคารับซื้อ/15.2) * น้ำหนักทอง (กรัม)
                calculatedPrice = (currentGoldPrice.bid / 15.2) * weight;
            } else {
                // Formula for 99.99% gold: ราคาขาย +3.5% x 0.0656 x น้ำหนักทอง
                const sellPrice = currentGoldPrice.ask;
                const priceWithMarkup = sellPrice * 1.035; // Add 3.5%
                calculatedPrice = priceWithMarkup * 0.0656 * weight;
            }
            
            setEstimatedPrice(calculatedPrice);
        }
    }, [goldPrices, goldWeight, selectedGoldType]);

    const formatPrice = (price: number | null) => {
        if (price === null) return "ไม่พบข้อมูล";
        return price.toLocaleString() + " บาท";
    };

    return (
        <div className="relative flex flex-col items-center justify-center w-full py-0">
            <div className="absolute flex lg:hidden size-40 rounded-full bg-blue-500 blur-[10rem] top-0 left-1/2 -translate-x-1/2 -z-10"></div>

            <div className="flex flex-col items-center justify-center gap-y-8 relative">
                <Container className="hidden lg:flex absolute inset-0 top-0 mb-auto flex-col items-center justify-center w-full min-h-screen -z-10">
                    <OrbitingCircles
                        speed={0.5}
                        radius={300}
                    >
                        <Icons.circle1 className="size-4 text-foreground/70" />
                        <Icons.circle2 className="size-1 text-foreground/80" />
                    </OrbitingCircles>
                    <OrbitingCircles
                        speed={0.25}
                        radius={400}
                    >
                        <Icons.circle2 className="size-1 text-foreground/50" />
                        <Icons.circle1 className="size-4 text-foreground/60" />
                        <Icons.circle2 className="size-1 text-foreground/90" />
                    </OrbitingCircles>
                    <OrbitingCircles
                        speed={0.1}
                        radius={500}
                    >
                        <Icons.circle2 className="size-1 text-foreground/50" />
                        <Icons.circle2 className="size-1 text-foreground/90" />
                        <Icons.circle1 className="size-4 text-foreground/60" />
                        <Icons.circle2 className="size-1 text-foreground/90" />
                    </OrbitingCircles>
                </Container>

                <div className="flex flex-col items-center justify-center text-center gap-y-4 bg-background/0">
                    <Container className="relative hidden lg:block overflow-hidden">
                        <button className="group relative grid overflow-hidden rounded-full px-2 py-1 shadow-[0_1000px_0_0_hsl(0_0%_15%)_inset] transition-colors duration-200 mx-auto">
                            <span>
                                <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
                            </span>
                            <span className="backdrop absolute inset-[1px] rounded-full bg-background transition-colors duration-200 group-hover:bg-neutral-800" />
                            <span className="z-10 py-0.5 text-sm text-neutral-100 flex items-center">
                                <span className="px-2 py-[0.5px] h-[18px] tracking-wide flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-red-600 text-[9px] font-medium mr-2 text-black">
                                    LIVE
                                </span>
                                ราคาทองวันนี้
                            </span>
                        </button>
                    </Container>

                    {/* Gold Price Display */}
                    <Container delay={0.1}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-4">
                            <div className="p-6 rounded-xl border border-border bg-card">
                                <h3 className="text-lg font-semibold mb-4">ทองคำ 99.99%</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">ราคารับซื้อ</span>
                                        <span className="font-medium">
                                            {isLoading ? "กำลังโหลด..." : formatPrice(goldPrices?.gold9999?.bid ?? null)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">ราคาขาย</span>
                                        <span className="font-medium">
                                            {isLoading ? "กำลังโหลด..." : formatPrice(goldPrices?.gold9999?.ask ?? null)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 rounded-xl border border-border bg-card">
                                <h3 className="text-lg font-semibold mb-4">ทองสมาคม</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">ราคารับซื้อ</span>
                                        <span className="font-medium">
                                            {isLoading ? "กำลังโหลด..." : formatPrice(goldPrices?.gold965?.bid ?? null)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">ราคาขาย</span>
                                        <span className="font-medium">
                                            {isLoading ? "กำลังโหลด..." : formatPrice(goldPrices?.gold965?.ask ?? null)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>

                    <Container delay={0.15}>
                        <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold text-center !leading-tight max-w-4xl mx-auto font-prompt mt-8">
                            ประเมินราคาทองคำ
                        </h1>
                        <div className="mt-8 max-w-md mx-auto space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground">ประเภททอง</label>
                                <Select value={selectedGoldType} onValueChange={setSelectedGoldType}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="เลือกประเภททอง" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {goldTypes.map((type) => (
                                            <SelectItem key={type.value} value={type.value}>
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground">น้ำหนักทอง (กรัม)</label>
                                <Input
                                    type="number"
                                    value={goldWeight}
                                    onChange={(e) => setGoldWeight(e.target.value)}
                                    min="0"
                                    step="0.1"
                                    placeholder="น้ำหนักทอง"
                                />
                            </div>
                            <div className="pt-4 text-center">
                                <div className="text-lg font-semibold">ราคาประเมิน</div>
                                <div className="text-2xl text-primary font-bold">
                                    {isLoading ? "กำลังคำนวณ..." : formatPrice(estimatedPrice)}
                                </div>
                            </div>
                        </div>
                    </Container>

                    <Container delay={0.2}>
                        <p className="max-w-xl mx-auto mt-2 text-base lg:text-lg text-center text-muted-foreground font-thai">
                            ประเมินราคาทองคำแบบเรียลไทม์ด้วยระบบอัตโนมัติ อัพเดทราคาทุก 30 วินาที
                        </p>
                    </Container>

                    <Container delay={0.25} className="z-20">
                        <div className="flex items-center justify-center mt-6 gap-x-4">
                            <Link href="https://web.facebook.com/profile.php?id=61570053279894" className="flex items-center gap-2 group text-black">
                                <Button size="lg">
                                    ติดต่อเเอดมิน
                                    <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-all duration-300" />
                                </Button>
                            </Link>
                        </div>
                    </Container>

                    <Container delay={0.3} className="relative">
                        <div className="relative rounded-xl lg:rounded-[32px] border border-border p-2 backdrop-blur-lg mt-10 max-w-6xl mx-auto">
                            <div className="absolute top-1/8 left-1/2 -z-10 bg-gradient-to-r from-primary to-red-600 w-1/2 lg:w-3/4 -translate-x-1/2 h-1/4 -translate-y-1/2 inset-0 blur-[4rem] lg:blur-[10rem] animate-image-glow"></div>
                            <div className="hidden lg:block absolute -top-1/8 left-1/2 -z-20 bg-primary w-1/4 -translate-x-1/2 h-1/4 -translate-y-1/2 inset-0 blur-[10rem] animate-image-glow"></div>

                            <div className="rounded-lg lg:rounded-[22px] border border-border bg-background">
                                <Image
                                    src="/images/dashboard_Aurienn.png"
                                    alt="ระบบออมทองออนไลน์ - หน้าแดชบอร์ด"
                                    width={1920}
                                    height={1080}
                                    className="rounded-lg lg:rounded-[20px]"
                                    priority
                                />
                            </div>
                        </div>
                        <div className="bg-gradient-to-t from-background to-transparent absolute bottom-0 inset-x-0 w-full h-1/2"></div>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default Hero;