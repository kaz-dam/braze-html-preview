"use client";

import { useTranslationFile } from "@/context/translation-context";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const SearchItem = () => {
    const [ mondayId, setMondayId ] = useState<number>();
    const { setTranslationFile } = useTranslationFile();
    const searchParams = useSearchParams();

    const refreshData = async () => {
        const response = await fetch(`/api/translations?mondayId=${mondayId}`);
        const translationFile = await response.json();
        console.log(translationFile);

        setTranslationFile(translationFile);
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
