"use client";

import { usePreview } from "@/context/preview-context";
import { View } from "@/types/component";

const ViewSelector = () => {
    const { setSelectedView } = usePreview();

    const onViewChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setSelectedView(parseInt(event.target.value) as View);
    };
    
    return (
        <select name="" id="" onChange={onViewChange} className="max-w-fit">
            <option value={View.MOBILE}>Mobile</option>
            <option value={View.TABLET}>Tablet</option>
            <option value={View.DESKTOP}>Desktop</option>
        </select>
    );
};

export default ViewSelector;