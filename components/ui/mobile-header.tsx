"use client";

import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import { useState } from "react";

const MobileHeader = ({ sidebarRef }: any) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const openSidebarOnMobile = () => {
        console.log(sidebarRef);
        sidebarRef.current?.classList.toggle("-translate-x-full");
        setIsOpen(!isOpen);
    };
    
    return (
        <div className="sm:hidden fixed top-3 right-3 w-12 h-12 z-50 rounded bg-blue-950 text-white flex items-center justify-center shadow" onClick={openSidebarOnMobile}>
            {isOpen ? 
                <PanelLeftClose size={32} /> :
                <PanelLeftOpen size={32} />
            }
        </div>
    );
};

export default MobileHeader;