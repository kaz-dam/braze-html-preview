"use client";

import { useTranslationFile } from "@/context/translation-context";
import useTemplates from "@/hooks/use-templates";
import { useEffect, useState } from "react";
import Loader from "./ui/loader";

enum View {
    MOBILE = 450,
    TABLET = 750,
    DESKTOP = 1100
};

const HtmlPreview = () => {
    const [ view, setView ] = useState<View>(View.MOBILE);
    const [ scale, setScale ] = useState<number>(1);
    const [ brazeTemplate, setBrazeTemplate ] = useState<string>("");
    const { translationFile, getTranslationFileKeys } = useTranslationFile();
    const { template, isLoading, error } = useTemplates();

    useEffect(() => {
        const actualIframeWidth = View.MOBILE;
        const scaleValue = view / actualIframeWidth;
        setScale(scaleValue);
    }, [view, brazeTemplate]);

    const onViewChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setView(parseInt(event.target.value) as View);
    };

    return (
        <div className="flex flex-col justify-center items-center gap-4 w-full">
            <select name="" id="" onChange={onViewChange} className="max-w-fit">
                <option value={View.DESKTOP}>Desktop</option>
                <option value={View.TABLET}>Tablet</option>
                <option value={View.MOBILE}>Mobile</option>
            </select>
            <div>{getTranslationFileKeys()}</div>
            <div
                className={`h-[600px] overflow-hidden border-2 border-slate-400 grid`}
                style={{
                    width: View.MOBILE
                }}
            >
                {isLoading ? 
                    <Loader /> :
                    <iframe 
                        src={template}
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