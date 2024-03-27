"use client";

import { useRef } from "react";
import SearchItem from "./search-item";
import MobileHeader from "./ui/mobile-header";
import ViewSelector from "./view-selector";
import ProjectInfoCard from "./project-info-card";
import { useProjectInfo } from "@/context/project-info-context";

const Sidebar = () => {
    const asideRef = useRef<HTMLDivElement>(null);
    const { itemTitle, projectChannel } = useProjectInfo();

    return (
        <>
            <MobileHeader sidebarRef={asideRef} />
            <aside ref={asideRef} className="fixed top-0 left-0 sm:translate-x-0 -translate-x-full z-50 w-[320px] h-full bg-blue-950 text-white px-6 py-10 transition-all">
                <h1 className="text-3xl text-center mb-6">{process.env.NEXT_PUBLIC_BRAND_NAME || "Brand"}</h1>
                <SearchItem />
                {itemTitle && (
                    <ProjectInfoCard />
                )}
                {projectChannel !== "pn" ? 
                    <ViewSelector />
                    : null}
            </aside>
        </>
    );
};

export default Sidebar;