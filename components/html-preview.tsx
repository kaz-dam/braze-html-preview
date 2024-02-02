"use client";

import { useEffect, useState } from "react";
import Loader from "./ui/loader";
import { HtmlPreviewProps, View } from "@/types/preview";

const HtmlPreview = ({ templatePath, mondayItemIsLoading }: HtmlPreviewProps) => {
    const [ view, setView ] = useState<View>(View.MOBILE);
    const [ scale, setScale ] = useState<number>(1);

    useEffect(() => {
        const actualIframeWidth = View.MOBILE;
        const scaleValue = view / actualIframeWidth;
        setScale(scaleValue);
    }, [view, templatePath]);

    const onViewChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setView(parseInt(event.target.value) as View);
    };

    return (
        <div className="flex flex-col justify-center items-center gap-4 w-full">
            <select name="" id="" onChange={onViewChange} className="max-w-fit">
                <option value={View.MOBILE}>Mobile</option>
                <option value={View.TABLET}>Tablet</option>
                <option value={View.DESKTOP}>Desktop</option>
            </select>
            <div
                className={`h-[630px] overflow-hidden border-2 border-slate-400 grid`}
                style={{
                    width: View.MOBILE
                }}
            >
                {mondayItemIsLoading ? 
                    <Loader /> :
                    <iframe 
                        src={templatePath}
                        style={{
                            width: `${scale * 100}%`,
                            height: `${scale * 100}%`,
                            transform: `scale(${1 / scale})`,
                            transformOrigin: "0 0"
                        }}
                        className="bg-slate-100"
                    ></iframe>
                }
            </div>
        </div>
    );
};

export default HtmlPreview;