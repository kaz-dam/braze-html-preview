"use client";

import * as RadioGroup from '@radix-ui/react-radio-group';
import { usePreview } from "@/context/preview-context";
import { View } from "@/types/component";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { FormEventHandler } from 'react';

const ViewSelector = () => {
    const { setSelectedView } = usePreview();

    const onViewChange = (value: any): void => {
        setSelectedView(parseInt(value));
    };
    
    return (
        <>
            <RadioGroup.Root defaultValue={`${View.MOBILE}`} onValueChange={onViewChange} aria-label="Responsive view">
                <div className="grid grid-cols-3 gap-2 my-6">
                    <RadioGroup.Item value={`${View.DESKTOP}`}>
                        <RadioGroup.Indicator className="flex items-center justify-center rounded py-2 cursor-pointer transition-all text-black hover:bg-brand-primary hover:text-brand-secondary">
                            <Monitor className="w-8 h-8" size={32} />
                        </RadioGroup.Indicator>
                    </RadioGroup.Item>
                    <RadioGroup.Item value={`${View.TABLET}`}>
                        <RadioGroup.Indicator className="flex items-center justify-center rounded py-2 cursor-pointer transition-all hover:bg-brand-primary hover:text-brand-secondary">
                            <Tablet className="w-8 h-8" />
                        </RadioGroup.Indicator>
                    </RadioGroup.Item>
                    <RadioGroup.Item value={`${View.MOBILE}`}>
                        <RadioGroup.Indicator className="flex items-center justify-center rounded py-2 cursor-pointer transition-all hover:bg-brand-primary hover:text-brand-secondary">
                            <Smartphone className="w-8 h-8" size={32} />
                        </RadioGroup.Indicator>
                    </RadioGroup.Item>
                </div>
            </RadioGroup.Root>
        </>
    );
};

export default ViewSelector;