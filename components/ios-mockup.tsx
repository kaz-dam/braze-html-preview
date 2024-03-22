"use client";

import Image from "next/image";
import iosLockedImage from "@/public/images/ios_locked_screen.png";
import hboMaxSmallImage from "@/public/images/hbomax_small_placeholder.png";

const IosMockup = () => {
    return (
        <div className="flex flex-col justify-center items-center bg-no-repeat bg-cover rounded-3xl w-[310px] h-[600px] overflow-hidden" style={{backgroundImage: "url(/images/ios_locked_screen.png)"}}>
            <div className="max-w-[290px] rounded-3xl absolute bottom-[176px] bg-white" style={{maxHeight: "calc(100% - 660px"}}>
                <div className="flex flex-row justify-between gap-4 p-4">
                    <div className="rounded overflow-hidden max-w-8 h-full">
                        <Image src={hboMaxSmallImage} alt="iOS" objectFit="cover" className="w-full h-auto object-cover" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs">Notification Title etc</span>
                        <span className="text-xs">Here's notification text.</span>
                    </div>
                    <div className="">
                        <span className="text-xs">now</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IosMockup;