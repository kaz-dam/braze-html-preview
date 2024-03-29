"use client";

import Image from "next/image";
import hboMaxSmallImage from "@/public/images/hbomax_small_placeholder.png";
import { PushMockupProps } from "@/types/component";

const IosMockup = ({ messageTitle, messageBody }: PushMockupProps) => {
    return (
        <div className="flex flex-col justify-end items-center bg-no-repeat bg-cover rounded-3xl w-[310px] h-[600px] overflow-hidden font-ios px-4 pb-28" style={{backgroundImage: "url(/images/ios_locked_screen.png)"}}>
            <div className="w-full rounded-3xl bg-white max-h-[300px]">
                <div className="flex flex-row justify-between items-start gap-4 p-4">
                    <div className="flex flex-row justify-between items-start gap-2">
                        <div className="rounded overflow-hidden max-w-8 h-full">
                            <Image src={hboMaxSmallImage} alt="iOS" objectFit="cover" className="w-full h-auto object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-semibold">{messageTitle}</span>
                            <span className="text-xs">{messageBody}</span>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <span className="text-xs">now</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IosMockup;