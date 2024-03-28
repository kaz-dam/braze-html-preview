"use client";

import IosMockup from "./ios-mockup";
import AndroidMockup from "./android-mockup";
import { usePreview } from "@/context/preview-context";
import { useEffect } from "react";

const PushPreview = () => {
    const { translation } = usePreview();
    
    return (
        <div className="flex lg:flex-row flex-col justify-between gap-6">
            <IosMockup messageBody={translation} messageTitle="Notification Title" />
            <AndroidMockup messageBody={translation} messageTitle="Notification Title" />
        </div>
    );
};

export default PushPreview;
