import { Dispatch } from "react";

export type DownloadBundle = {
    project_id: string;
    bundle_url: string;
    branch?: string;
};

export type TranslationFile = { [key: string]: string };

export type TranslationFileContextType = {
    translationFile: TranslationFile;
    setTranslationFile: Dispatch<TranslationFile>;
    getTranslationFileKeys: () => string[];
};