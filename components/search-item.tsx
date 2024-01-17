"use client";

import { useTranslationFile } from "@/context/translation-context";
import { useState } from "react";

const SearchItem = () => {
    const [ mondayId, setMondayId ] = useState("");
    const { setTranslationFile } = useTranslationFile();

    const refreshData = async () => {
        const response = await fetch(`/api/translations?mondayId=${mondayId}`);
        const translationFile = await response.json();
        console.log(translationFile);

        setTranslationFile(translationFile);
    };

    const onInputChange = (event: any) => {
        // if (event.target.value.length > 3) {
            setMondayId(event.target.value);
        // }
    };

    return (
        <div className="flex flex-col justify-center gap-2">
            <input type="text" placeholder="Enter Monday.com ID" onChange={onInputChange} />
            <button className="px-4 py-2 rounded-sm bg-purple-700 text-white" onClick={refreshData}>Refresh</button>
        </div>
    );
};

export default SearchItem;
