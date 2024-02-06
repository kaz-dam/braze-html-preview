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
    console.log(data);

    return {
        key,
        translation: data,
        error,
        isLoading
    };
};

export default useLokaliseTranslation;