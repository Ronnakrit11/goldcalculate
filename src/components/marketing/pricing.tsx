"use client";

import { PLANS } from "@/constants";
import { PLAN } from "@/constants/plans";
import { cn } from "@/lib";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon } from "lucide-react";
import Container from "../global/container";
import { Button } from "../ui/button";

const Pricing = () => {
    return (
        <div id="pricing" className="relative flex flex-col items-center justify-center max-w-5xl py-20 mx-auto">
            <div className="flex flex-col items-center justify-center max-w-2xl mx-auto">
                <Container>
                    <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium !leading-snug mt-6">
                           เเพ็คเกจระบบออมทอง ซื้อขายทอง <br className="hidden lg:block" /> <span className="font-subheading italic">ออนไลน์</span>
                        </h2>
                        <p className="text-base md:text-lg text-center text-accent-foreground/80 mt-6 font-thai">
                            ระบบซื้อขายทองเเละการออมทองเเบบเรียลไทม์ สร้างโอกาสการเติบโตของร้านทองของคุณ, เน้นความปลอดภัย, สะดวกสบายให้เเก่ลูกค้าที่จะออมทอง.
                        </p>
                    </div>
                </Container>
            </div>

            <div className="grid w-full grid-cols-1 lg:grid-cols-2 pt-8 lg:pt-12 gap-4 lg:gap-6 max-w-4xl mx-auto">
                {PLANS.map((plan, idx) => (
                    <Container key={idx} delay={0.1 * idx + 0.2}>
                        <Plan key={plan.id} plan={plan} />
                    </Container>
                ))}
            </div>
        </div>
    );
};

const Plan = ({ plan }: { plan: PLAN }) => {
    return (
        <div className={cn(
            "flex flex-col relative rounded-2xl lg:rounded-3xl transition-all bg-background/ items-start w-full border border-foreground/10 overflow-hidden",
            plan.title === "Mastermind" && "border-blue-500"
        )}>
            {plan.title === "Mastermind" && (
                <div className="absolute top-1/2 inset-x-0 mx-auto h-12 -rotate-45 w-full bg-blue-600 rounded-2xl lg:rounded-3xl blur-[8rem] -z-10"></div>
            )}

            <div className="p-4 md:p-8 flex rounded-t-2xl lg:rounded-t-3xl flex-col items-start w-full relative">
                <h2 className="font-medium text-xl text-foreground pt-5 font-thai">
                    {plan.title}
                </h2>
                <h3 className="mt-3 text-3xl font-medium md:text-5xl">
                    <NumberFlow
                        value={plan.annuallyPrice}
                        suffix="/yr"
                        format={{
                            currency: "THB",
                            style: "currency",
                            currencySign: "standard",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                            currencyDisplay: "narrowSymbol"
                        }}
                    />
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mt-2 font-thai">
                    {plan.desc}
                </p>
            </div>
            <div className="flex flex-col items-start w-full px-4 py-2 md:px-8">
                <Button size="lg" variant={plan.title === "Mastermind" ? "blue" : "white"} className="w-full font-thai">
                    {plan.buttonText}
                </Button>
                <div className="h-8 overflow-hidden w-full mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key="annual"
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="text-sm text-center text-muted-foreground mt-3 mx-auto block font-thai"
                        >
                            Billed annually
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>
            <div className="flex flex-col items-start w-full p-5 mb-4 ml-1 gap-y-2">
                <span className="text-base text-left mb-2 font-thai">
                    Includes: 
                </span>
                {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-start gap-2">
                        <div className="flex items-center justify-center">
                            <CheckIcon className="size-5" />
                        </div>
                        <span className="font-thai">{feature}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pricing;