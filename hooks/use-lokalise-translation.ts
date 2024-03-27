import { fetcher } from "@/lib/utils";
import { LokaliseTranslationHook } from "@/types/translations";
import useSWR from "swr";

const useLokaliseTranslation = (
    projectId: string | undefined,
    taskId: number | undefined,
    templateName: string | undefined
): LokaliseTranslationHook => {
    const key = `/api/translations/${projectId}/${taskId}?templateName=${templateName}`;

    const { data, error, isLoading } = useSWR(key, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    return {
        translationKey: key,
        translation: data?.data,
        translationError: data?.success ? null : data,
        isTranslationLoading: isLoading
    };
};

export default useLokaliseTranslation;