export type Channel = "iam" | "eml" | "pn";

export type OctokitData = {
    content: ArrayBuffer;
    encoding: number;
    name: string;
    path: string;
};

export type LiquidContextSecret = {
    username: string;
    password?: string;
};

export type LiquidContextContentBlocks = {
    root: string;
    ext: string;
};

export type LiquidContext = {
    firsName: string;
    lastName: string;
    campaign: { name: string; };
    dev_environment: string;
    json_data: { [ key: string ]: string };
    custom_attribute: { [ attributeName: string ]: string[] | string };
    __contentBlocks: LiquidContextContentBlocks;
    __secrets: { [ key: string ]: LiquidContextSecret }
};