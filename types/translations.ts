import { Dispatch } from "react";

export type DownloadBundle = {
    project_id: string;
    bundle_url: string;
    branch?: string;
};

export type TranslationFile = { [key: string]: string } | JSON;

export type TranslationContextType = TranslationIds & {
    setMondayId: Dispatch<number | undefined>;
    setProjectId: Dispatch<string | undefined>;
};

export type TranslationIds = {
    mondayId: number | undefined;
    projectId: string | undefined;
};

export type TranslationsRouteParams = {
    params: TranslationIds
};

export type TranslationRouteResponse = {
    projectId: string;
    translation: TranslationFile
};

export type LokaliseTranslationHook = {
    key: string;
    translation: TranslationRouteResponse;
    error: any;
    isLoading: boolean;
};