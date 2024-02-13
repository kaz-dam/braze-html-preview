import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]): string => {
    return twMerge(clsx(inputs));
};

export const fetcher = async (url: string): Promise<any> => {
    const response = await fetch(url, {
        cache: "no-store"
    });
    return await response.json();
};
