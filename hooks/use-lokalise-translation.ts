import { fetcher } from "@/lib/utils";
import useSWR from "swr";

const useLokaliseTranslation = (mondayId: number | undefined) => {
    const { data, error, isLoading } = useSWR(`/api/translations?mondayId=${mondayId}`, fetcher);

    return {
        translation: data,
        error,
        isLoading
    };
};

export default useLokaliseTranslation;