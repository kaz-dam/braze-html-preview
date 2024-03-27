import { Dispatch } from "react";

export type TranslationObject = { [key: string]: string };

export type TranslationContextType = TranslationIds & {
    setMondayId: Dispatch<number | undefined>;
    setMondayParentId: Dispatch<number | undefined>;
    setLanguage: Dispatch<string | undefined>;
    setProjectId: Dispatch<string | undefined>;
};

export type TranslationIds = {
    mondayId: number;
    mondayParentId: number;
    language: string | undefined;
    projectId: string;
    taskId: number;
    templateName: string;
};

export type TranslationsRouteParams = {
    params: TranslationIds
};

export type TranslationRouteResponse = {
    pathToFile?: string;
};

export type LokaliseTranslationHook = {
    translationKey: string;
    translation: TranslationRouteResponse;
    translationError: Error | null;
    isTranslationLoading: boolean;
};
