"use client";

import { usePreview } from "@/context/preview-context";
import HtmlPreview from "./html-preview";
import { useEffect } from "react";
import PushPreview from "./push-preview";
import { useProjectInfo } from "@/context/project-info-context";

const PreviewWrapper = () => {
    const { templatePath } = usePreview();
    const { projectChannel } = useProjectInfo();

    useEffect(() => {
        console.log("Template path: ", templatePath);
    }, [templatePath]);

    return (
        <div className="flex justify-center items-center w-full h-screen">
            {projectChannel == "pn" ?
                <PushPreview /> :
                <HtmlPreview />
            }
        </div>
    );
};

export default PreviewWrapper;