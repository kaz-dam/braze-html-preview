"use client";

import { usePreview } from "@/context/preview-context";
import HtmlPreview from "./html-preview";
import { useEffect } from "react";
import PushPreview from "./push-preview";

const PreviewWrapper = () => {
    const { templatePath } = usePreview();

    useEffect(() => {
        console.log("Template path: ", templatePath);
    }, [templatePath]);

    return (
        <div className="flex justify-center items-center w-full h-screen">
            {templatePath.includes("pn") ?
                <PushPreview /> :
                <HtmlPreview />
            }
        </div>
    );
};

export default PreviewWrapper;