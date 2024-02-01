import { fetcher } from "@/lib/utils";
import { LokaliseTranslationHook } from "@/types/translations";
import useSWR from "swr";

const useLokaliseTranslation = (
    mondayId: number | undefined,
    projectId: string | undefined,
    language: string | undefined
): LokaliseTranslationHook => {
    // const key = (projectId && language) 
    //     ? `/api/translations/${mondayId}/${projectId}?language=${language}`
    //     : `/api/translations/${mondayId}`;
    const key = `/api/translations/${mondayId}`;

    const { data, error, isLoading } = useSWR(key, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    return {
        key,
        translation: data,
        error,
        isLoading
    };
};

export default useLokaliseTranslation;