"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import useLokaliseTranslation from "@/hooks/use-lokalise-translation";
import HtmlPreview from "./html-preview";

const SearchItem = () => {
    const searchParams = useSearchParams();
    const [ mondayId, setMondayId ] = useState<number>();
    const [ mondayParentId, setMondayParentId ] = useState<number>();
    const [ projectId, setProjectId ] = useState<string>();
    const [ language, setLanguage ] = useState<string>();
    const { mutate } = useSWRConfig();
    const { key, translation, isLoading, error } = useLokaliseTranslation(mondayId, projectId, language);

    const onInputChange = (event: any) => {
        setMondayId(parseInt(event.target.value));
    };

    const refreshData = () => {
        mutate(key);
    };

    useEffect(() => {
        const mondayidParam = searchParams.get("mondayid");
        if (mondayidParam) {
            setMondayId(parseInt(mondayidParam));
        }
    }, []);

    useEffect(() => {
        if (translation?.projectId) {
            setProjectId(translation?.projectId);
            setMondayParentId(translation.mondayParentId);
            setLanguage(translation.language);
        }
    }, [isLoading]);

    return (
        <>
            <div className="flex flex-col justify-center gap-2">
                {(!searchParams.has("mondayid") || !searchParams.get("mondayid")) && (
                    <input type="text" placeholder="Enter Monday.com ID" onChange={onInputChange} />
                )}
                <button className="px-4 py-2 rounded-sm bg-purple-700 text-white" onClick={refreshData}>Refresh</button>
                {translation && <div>{translation?.projectId}</div>}
            </div>
            <HtmlPreview
                templatePath={translation?.pathToFile ? translation.pathToFile : ""}
                mondayItemIsLoading={isLoading} />
        </>
    );
};

export default SearchItem;
