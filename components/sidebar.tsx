"use client";

import { useCallback, useRef, useState } from "react";
import SearchItem from "./search-item";
import MobileHeader from "./ui/mobile-header";
import ViewSelector from "./view-selector";

const Sidebar = () => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    const asideRef = useRef<HTMLDivElement>(null);

    const openSidebarOnMobile = useCallback(() => {
        asideRef.current?.classList.toggle("-left-full");
        setIsOpen(!isOpen);
    }, []);

    return (
        <>
            <MobileHeader onClick={openSidebarOnMobile} isOpen={isOpen} />
            <aside ref={asideRef} className="fixed top-0 sm:left-0 -left-full z-50 w-[320px] h-full bg-blue-950 text-white px-6 py-10 transition-all">
                <h1 className="text-3xl text-center mb-6">{process.env.NEXT_PUBLIC_BRAND_NAME || "Brand"}</h1>
                <SearchItem />
                <ViewSelector />
            </aside>
        </>
    );
};

export default Sidebar;