import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const fetcher = async (url: string) => {
    const response = await fetch(url);
    return await response.json();
};
