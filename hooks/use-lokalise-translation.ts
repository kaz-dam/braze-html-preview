import { fetcher } from "@/lib/utils";
import useSWR from "swr";

const useLokaliseTranslation = (mondayId: number | undefined, projectId: string | undefined) => {
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