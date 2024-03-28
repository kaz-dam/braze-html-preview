"use client";

import HtmlPreview from "./html-preview";
import PushPreview from "./push-preview";
import { useProjectInfo } from "@/context/project-info-context";

const PreviewWrapper = () => {
    const { projectChannel } = useProjectInfo();

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