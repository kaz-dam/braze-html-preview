"use client";

import { useTranslation } from "@/context/translation-context";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useSWRConfig } from "swr";
import useLokaliseTranslation from "@/hooks/use-lokalise-translation";

const SearchItem = () => {
    const searchParams = useSearchParams();
    const {
        mondayId,
        projectId,
        setMondayId,
        setMondayParentId,
        setLanguage,
        setProjectId
    } = useTranslation();
    const { key, translation, isLoading, error } = useLokaliseTranslation(mondayId, projectId);
    const { mutate } = useSWRConfig();

    const refreshData = () => {
        mutate(key);
    };

    const onInputChange = (event: any) => {
        setMondayId(parseInt(event.target.value));
    };

    useEffect(() => {
        const mondayidParam = searchParams.get("mondayid");
        if (mondayidParam) {
            setMondayId(parseInt(mondayidParam));
        }
    }, []);

    useEffect(() => {
        console.log(translation);
        if (translation?.projectId) {
            setProjectId(translation?.projectId);
            setMondayParentId(translation.mondayParentId);
            setLanguage(translation.language);
        }
    }, [isLoading]);

    return (
        <div className="flex flex-col justify-center gap-2">
            {(!searchParams.has("mondayid") || !searchParams.get("mondayid")) && (
                <input type="text" placeholder="Enter Monday.com ID" onChange={onInputChange} />
            )}
            <button className="px-4 py-2 rounded-sm bg-purple-700 text-white" onClick={refreshData}>Refresh</button>
            {translation && <div>{translation?.projectId}</div>}
        </div>
    );
};

export default SearchItem;
