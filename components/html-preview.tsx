"use client";

import { useTranslationFile } from "@/context/translation-context";
import { useEffect, useState } from "react";

enum View {
    MOBILE = 450,
    TABLET = 750,
    DESKTOP = 1100
};

const HtmlPreview = () => {
    const [ view, setView ] = useState<View>(View.DESKTOP);
    const [ scale, setScale ] = useState<number>(1);
    const [ brazeTemplate, setBrazeTemplate ] = useState<string>("");
    const { translationFile, getTranslationFileKeys } = useTranslationFile();

    useEffect(() => {
        const actualIframeWidth = View.MOBILE;
        const scaleValue = view / actualIframeWidth;
        setScale(scaleValue);
    }, [view, brazeTemplate]);

    const onViewChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setView(parseInt(event.target.value) as View);
    };

    const onLoadTemplateClicked = async () => {
        // TODO: make this process automatic triggered by the monday id input
        const response = await fetch("/api/templates");
        const body = await response.json();

        if (response.ok) {
            setBrazeTemplate(body);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center gap-4 w-full">
            <select name="" id="" onChange={onViewChange} className="max-w-fit">
                <option value={View.DESKTOP}>Desktop</option>
                <option value={View.TABLET}>Tablet</option>
                <option value={View.MOBILE}>Mobile</option>
            </select>
            <div>{getTranslationFileKeys()}</div>
            <button onClick={onLoadTemplateClicked}>Load template</button>
            <div className={`w-[${View.MOBILE}px] h-[600px] overflow-hidden border-2 border-slate-400`}>
                <iframe 
                    src={brazeTemplate}
                    style={{
                        width: `${scale * 100}%`,
                        height: `${scale * 100}%`,
                        transform: `scale(${1 / scale})`,
                        transformOrigin: "0 0"
                    }}
                    className="bg-slate-100"
                ></iframe>
            </div>
        </div>
    );
};

export default HtmlPreview;