"use client";

import { Roboto } from "next/font/google";
import Image from "next/image";
import hboMaxSmallImage from "@/public/images/hbomax_small_placeholder.png";
import { PushMockupProps } from "@/types/component";

const roboto = Roboto({
    weight: "300",
    style: "normal",
    subsets: ["latin"]
});

const AndroidMockup = ({ messageTitle, messageBody }: PushMockupProps) => {
    return (
        <div className={`flex flex-col justify-center items-center bg-no-repeat bg-cover rounded-3xl w-[337px] h-[600px] overflow-hidden ${roboto.className}`} style={{backgroundImage: "url(/images/android_screen.png)"}}>
            <div className="w-[329px] rounded-lg absolute top-[245px] bg-white p-4">
                <header className="flex flex-row justify-start gap-2 text-[10px] mb-3">
                    <div className="overflow-hidden w-4 h-full">
                        <Image src={hboMaxSmallImage} alt="iOS" objectFit="cover" className="w-full h-auto object-cover" />
                    </div>
                    <span>HBO Max Android</span>
                    <span>●</span>
                    <span>9m</span>
                </header>
                <div className="flex flex-row justify-between gap-4">
                    <div className="flex flex-col w-5/6">
                        <span className="text-xs mb-2">{messageTitle}</span>
                        <span className="text-xs">{messageBody}</span>
                    </div>
                    <div className="overflow-hidden w-1/6 h-full rounded">
                        <Image src={hboMaxSmallImage} alt="iOS" objectFit="cover" className="w-full h-auto object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AndroidMockup;