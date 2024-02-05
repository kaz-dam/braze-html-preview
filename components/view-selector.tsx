"use client";

import * as RadioGroup from '@radix-ui/react-radio-group';
import { usePreview } from "@/context/preview-context";
import { View } from "@/types/component";
import { Monitor, Smartphone, Tablet } from "lucide-react";

const ViewSelector = () => {
    const { setSelectedView } = usePreview();

    const onViewChange = (value: any): void => {
        setSelectedView(parseInt(value));
    };
    
    return (
        <div className="my-8">
            <h2 className="text-xl text-center">Responsive view</h2>
            <RadioGroup.Root defaultValue={`${View.MOBILE}`} onValueChange={onViewChange} aria-label="Responsive view">
                <div className="grid grid-cols-3 gap-2 my-6">
                    <RadioGroup.Item value={`${View.DESKTOP}`} className="relative h-11 rounded cursor-pointer transition-all hover:bg-brand-primary overflow-hidden">
                        <RadioGroup.Indicator className="w-full h-full bg-brand-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        <Monitor className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={32} />
                    </RadioGroup.Item>
                    <RadioGroup.Item value={`${View.TABLET}`} className="relative h-11 rounded cursor-pointer transition-all hover:bg-brand-primary overflow-hidden">
                        <RadioGroup.Indicator className="w-full h-full bg-brand-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        <Tablet className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </RadioGroup.Item>
                    <RadioGroup.Item value={`${View.MOBILE}`} className="relative h-11 rounded cursor-pointer transition-all hover:bg-brand-primary overflow-hidden">
                        <RadioGroup.Indicator className="w-full h-full bg-brand-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        <Smartphone className="w-8 h-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={32} />
                    </RadioGroup.Item>
                </div>
            </RadioGroup.Root>
        </div>
    );
};

export default ViewSelector;