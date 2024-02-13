import { fetcher } from "@/lib/utils";
import { LokaliseTranslationHook } from "@/types/translations";
import useSWR from "swr";

const useLokaliseTranslation = (
    mondayId: number | undefined
): LokaliseTranslationHook => {
    const key = `/api/translations/${mondayId}`;

    const { data, error, isLoading } = useSWR(key, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    return {
        key,
        translation: data?.data,
        error: data?.success ? null : data,
        isLoading
    };
};

export default useLokaliseTranslation;