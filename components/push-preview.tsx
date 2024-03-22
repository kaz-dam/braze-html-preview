"use client";

import useLokaliseTranslation from "@/hooks/use-lokalise-translation";
import Loader from "./ui/loader";
import Image from "next/image";
import iosLockedImage from "@/public/images/ios_locked_screen.png";
import hboMaxSmallImage from "@/public/images/hbomax_small_placeholder.png";
import IosMockup from "./ios-mockup";
import AndroidMockup from "./android-mockup";

const PushPreview = () => {
    return (
        <div className="flex lg:flex-row flex-col justify-between gap-6">
            <IosMockup />
            <AndroidMockup />
        </div>
    );
};

export default PushPreview;
