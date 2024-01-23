import { Dispatch } from "react";

export type DownloadBundle = {
    project_id: string;
    bundle_url: string;
    branch?: string;
};

export type TranslationFile = { [key: string]: string } | JSON;

export type TranslationFileContextType = {
    translationFile: TranslationFile;
    setTranslationFile: Dispatch<TranslationFile>;
    getTranslationFileKeys: () => string[];
};

export type TranslationIds = {
    mondayid: number;
    projectid: string;
};

export type TranslationsRouteParams = {
    params: TranslationIds
};

export type TranslationRouteResponse = {
    projectId: string;
    translation: TranslationFile
};