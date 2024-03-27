"use client";

import { useProjectInfo } from "@/context/project-info-context";

const ProjectInfoCard = () => {
    const { itemTitle, projectLanguage, projectChannel, projectTemplate } = useProjectInfo();

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold text-center mb-2">{itemTitle}</h2>
            <div className="flex flex-col divide-y-[1px]">
                <div className="flex flex-row justify-between items-center">
                    <span className="font-semibold">Channel</span>
                    <span>{projectChannel}</span>
                </div>
                <div className="flex flex-row justify-between items-center">
                    <span className="font-semibold">Language</span>
                    <span>{projectLanguage}</span>
                </div>
                <div className="flex flex-col justify-between items-start">
                    <span className="font-semibold">Template</span>
                    <span>{projectTemplate}</span>
                </div>
            </div>
        </div>
    );
};

export default ProjectInfoCard;
