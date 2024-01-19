import useSWR from "swr";
import { fetcher } from "@/lib/utils";

const useTemplates = () => {
    const { data, error, isLoading } = useSWR("/api/templates", fetcher);

    return {
        template: data,
        isLoading,
        error
    };
};

export default useTemplates;
