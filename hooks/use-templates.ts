import useSWR from "swr";
import { fetcher } from "@/lib/utils";

const useTemplates = () => {
    const { data, error, isLoading } = useSWR("/api/templates", fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    return {
        template: data,
        isLoading,
        error
    };
};

export default useTemplates;
