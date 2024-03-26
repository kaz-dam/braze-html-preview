"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";
import useLokaliseTranslation from "@/hooks/use-lokalise-translation";
import { usePreview } from "@/context/preview-context";
import { toast } from "react-toastify";
import useProjectManagementItem from "@/hooks/use-project-management-item";
import { useProjectInfo } from "@/context/project-info-context";

const SearchItem = () => {
    const searchParams = useSearchParams();
    const [ mondayId, setMondayId ] = useState<number>();
    const { mutate } = useSWRConfig();
    // const { key, translation, isLoading, error } = useLokaliseTranslation(mondayId);
    const { key, item, isLoading, error } = useProjectManagementItem(mondayId);
    const { setItemTitle, setProjectChannel, setProjectLanguage, setProjectTemplate } = useProjectInfo();
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
        console.log("item", item);
        setTemplatePath(item?.pathToFile ? item.pathToFile : "");
        setMondayItemIsLoading(isLoading);

        setItemTitle(item?.title ? item.title : "");
        setProjectChannel(item?.channel ? item.channel : "");
        setProjectLanguage(item?.language ? item.language : "");
        setProjectTemplate(item?.template ? item.template : "");
        
        toast(error?.message, {
            type: !error?.message ? "success" : "error"
        });
    }, [isLoading, item]);

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
