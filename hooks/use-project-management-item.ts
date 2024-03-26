import { fetcher } from "@/lib/utils";
import useSWR from "swr";

const useProjectManagementItem = (itemId: number | undefined) => {
    const key = `/api/project/${itemId}`;

    const { data, error, isLoading } = useSWR(key, fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    return {
        key,
        item: data?.data,
        error: data?.success ? null : data,
        isLoading
    };
};

export default useProjectManagementItem;