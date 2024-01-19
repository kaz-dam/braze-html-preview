import { cn } from "@/lib/utils"

type LoaderProps = {
    className?: string;
};

const Loader = ({ className }: LoaderProps) => {
    return (
        <span className={cn("inline-block w-12 h-12 border-4 border-purple-700 rounded-full animate-spin border-b-transparent", className)}></span>
    );
};

export default Loader;