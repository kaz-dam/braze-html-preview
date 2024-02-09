"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import useLokaliseTranslation from "@/hooks/use-lokalise-translation";
import { usePreview } from "@/context/preview-context";
import { toast } from "react-toastify";

const SearchItem = () => {
    const searchParams = useSearchParams();
    const [ mondayId, setMondayId ] = useState<number>();
    const { mutate } = useSWRConfig();
    const { key, translation, isLoading, error } = useLokaliseTranslation(mondayId);
    const { setTemplatePath, setMondayItemIsLoading } = usePreview();

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setMondayId(parseInt(event.target.value));
    };

    const refreshData = async (): Promise<void> => {
        await mutate(key);
        toast("Data refreshed", {
            type: "success"
        });
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
        
        toast(error?.message, {
            type: !error?.message ? "success" : "error"
        });
    }, [isLoading, translation?.pathToFile]);

    return (
        <>
            <h2 className="text-xl text-center mb-2">Template preview</h2>
            <div className="flex flex-col justify-center gap-2">
                {(!searchParams.has("mondayid") || !searchParams.get("mondayid")) && (
                    <input type="text" placeholder="Enter Monday.com subitem ID..." onChange={onInputChange} className=" text-black rounded border-none placeholder:text-sm" />
                )}
                <button className="px-4 py-2 rounded bg-brand-primary text-white disabled:bg-opacity-70" onClick={refreshData} disabled={!mondayId}>Refresh</button>
            </div>
        </>
    );
};

export default SearchItem;
