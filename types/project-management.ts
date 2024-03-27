import { Channel } from "./templates";

export type ProjectManagementRouteParams = {
    params: {
        itemId: string | undefined;
    };
};

export type ProjectManagementAttributes = {
    lokaliseProjectId: string;
    lokaliseTaskId: number;
    parentItemId: number;
    language: string;
    channel: Channel;
    template: string;
    itemName: string;
};

export type ProjectItemHook = {
    key: string;
    item: ProjectManagementAttributes | undefined;
    error: Error | null;
    isLoading: boolean;
};