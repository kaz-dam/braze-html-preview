"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import useLokaliseTranslation from "@/hooks/use-lokalise-translation";
import { usePreview } from "@/context/preview-context";

const SearchItem = () => {
    const searchParams = useSearchParams();
    const [ mondayId, setMondayId ] = useState<number>();
    const { mutate } = useSWRConfig();
    const { key, translation, isLoading, error } = useLokaliseTranslation(mondayId);
    const { setTemplatePath, setMondayItemIsLoading } = usePreview();

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setMondayId(parseInt(event.target.value));
    };

    const refreshData = (): void => {
        mutate(key);
    };

    useEffect(() => {
        const mondayidParam: string | null = searchParams.get("mondayid");

        if (mondayidParam) {
            setMondayId(parseInt(mondayidParam));
        }
    }, []);

    useEffect(() => {
        setTemplatePath(translation?.pathToFile ? translation.pathToFile : "");
        setMondayItemIsLoading(isLoading);
    }, [isLoading]);

    return (
        <>
            <div className="flex flex-col justify-center gap-2">
                {(!searchParams.has("mondayid") || !searchParams.get("mondayid")) && (
                    <input type="text" placeholder="Enter Monday.com ID" onChange={onInputChange} />
                )}
                <button className="px-4 py-2 rounded-sm bg-brand-primary text-brand-secondary disabled:bg-opacity-70" onClick={refreshData} disabled={!mondayId}>Refresh</button>
            </div>
        </>
    );
};

export default SearchItem;
