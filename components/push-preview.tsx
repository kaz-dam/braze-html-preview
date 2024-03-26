"use client";

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
