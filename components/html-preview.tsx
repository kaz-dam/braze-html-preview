"use client";

import { useEffect, useState } from "react";
import Loader from "./ui/loader";
import { View } from "@/types/component";
import { usePreview } from "@/context/preview-context";

const HtmlPreview = () => {
    const [ scale, setScale ] = useState<number>(1);
    const { templatePath, mondayItemIsLoading, selectedView } = usePreview();

    useEffect(() => {
        const actualIframeWidth = View.MOBILE;
        const scaleValue = selectedView / actualIframeWidth;
        setScale(scaleValue);
    }, [selectedView, templatePath]);

    return (
        // <div className="flex justify-center items-center w-full h-screen">
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
        // </div>
    );
};

export default HtmlPreview;