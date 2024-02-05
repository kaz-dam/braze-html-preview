"use client";

import { PanelLeftOpen, PanelLeftClose } from "lucide-react";

const MobileHeader = ({ onClick, isOpen }: any) => {
    return (
        <div className="sm:hidden fixed top-3 right-3 w-12 h-12 rounded bg-blue-950 text-white flex items-center justify-center shadow" onClick={onClick}>
            {isOpen ? <PanelLeftClose size={32} /> : <PanelLeftOpen size={32} />}
        </div>
    );
};

export default MobileHeader;