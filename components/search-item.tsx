"use client";

import useLokaliseTranslation from "@/hooks/use-lokalise-translation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";

const SearchItem = () => {
    const [ mondayId, setMondayId ] = useState<number>();
    const searchParams = useSearchParams();
    const { key, translation, isLoading, error } = useLokaliseTranslation(mondayId, undefined);
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
    }, [isLoading]);

    return (
        <div className="flex flex-col justify-center gap-2">
            {(!searchParams.has("mondayid") || !searchParams.get("mondayid")) && (
                <input type="text" placeholder="Enter Monday.com ID" onChange={onInputChange} />
            )}
            <button className="px-4 py-2 rounded-sm bg-purple-700 text-white" onClick={refreshData}>Refresh</button>
        </div>
    );
};

export default SearchItem;
