"use client";

import { useState } from "react";
import axios from "axios";

const SearchItem = () => {
    const [ mondayId, setMondayId ] = useState("");

    const refreshData = async () => {
        const response = await axios.get("/api/translations", {
            params: {
                mondayId
            }
        });
        
        console.log(response.data);
        // TODO: save translation data into context so the preview can re-run the template with liquid
    };

    const onInputChange = (event: any) => {
        // if (event.target.value.length > 3) {
            // console.log(event.target.value);
            // TODO: get monday.com item by its id
            // TODO: fetch on frontend or create api route
            // TODO: fetch the Lokalise Project Link column
            // TODO: parse the url for the lokalise project id
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
