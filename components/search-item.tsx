"use client";

import { useState } from "react";

const SearchItem = () => {
    const [ mondayId, setMondayId ] = useState("");

    const refreshData = async () => {
        console.log("refreshed");
        const response = await fetch("/api/translations");
        const body = await response.json();
        console.log(body);
    };

    const onInputChange = (event: any) => {
        if (event.target.value.length > 3) {
            // console.log(event.target.value);
            setMondayId(event.target.value);
        }
    };

    return (
        <div className="flex flex-col justify-center gap-2">
            <input type="text" placeholder="Enter Monday.com ID" onChange={onInputChange} />
            <button className="px-4 py-2 rounded-sm bg-purple-700 text-white" onClick={refreshData}>Refresh</button>
        </div>
    );
};

export default SearchItem;
