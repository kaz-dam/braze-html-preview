import { fetcher } from "@/lib/utils";
import { LokaliseTranslationHook } from "@/types/translations";
import useSWR from "swr";

const useLokaliseTranslation = (
    mondayId: number | undefined,
    projectId: string | undefined
): LokaliseTranslationHook => {
    const key = projectId 
        ? `/api/translations/${mondayId}/${projectId}`
        : `/api/translations/${mondayId}`;

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