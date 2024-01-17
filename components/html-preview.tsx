"use client";

import { useTranslationFile } from "@/context/translation-context";
import { useEffect, useState } from "react";

type HtmlPreviewProps = {
    template: string
};

enum View {
    MOBILE = "450",
    TABLET = "750",
    DESKTOP = "1100"
};

const HtmlPreview = ({ template }: HtmlPreviewProps) => {
    const [ view, setView ] = useState<View>(View.DESKTOP);
    const [ brazeTemplate, setBrazeTemplate ] = useState("");
    const { translationFile, getTranslationFileKeys } = useTranslationFile();

    const onViewChange = (event: any) => {
        console.log(event.target.value);
        setView(event.target.value);
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
        <div className="flex flex-col justify-center items-center gap-4">
            <select name="" id="" onChange={onViewChange} className="max-w-fit">
                <option value={View.DESKTOP}>Desktop</option>
                <option value={View.TABLET}>Tablet</option>
                <option value={View.MOBILE}>Mobile</option>
            </select>
            <div>{getTranslationFileKeys()}</div>
            <button onClick={onLoadTemplateClicked}>Load template</button>
            <iframe src={brazeTemplate} width={view} height={600} className="border-2 border-slate-400 bg-slate-100"></iframe>
        </div>
    );
};

export default HtmlPreview;