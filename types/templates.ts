export type Channel = "iam" | "eml" | "pn";

export type OctokitData = {
    content: ArrayBuffer;
    encoding: number;
    name: string;
    path: string;
};