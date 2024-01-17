"use client";

import { Dispatch, createContext, useContext, useState } from "react";

type TranslationFileContextType = {
    translationFile: Object;
    setTranslationFile: Dispatch<any>;
    getTranslationFileKeys: () => string[];
};

const TranslationFileContext = createContext<TranslationFileContextType | undefined>(undefined);

export const TranslationFileProvider = ({ children }: React.PropsWithChildren) => {
    const [ translationFile, setTranslationFile ] = useState<any>(undefined);

    const getTranslationFileKeys = (): string[] => {
        if (translationFile) {
            return Object.keys(translationFile);
        }
        return [];
    };

    const availableValues = {
        translationFile,
        setTranslationFile,
        getTranslationFileKeys
    };

    return (
        <TranslationFileContext.Provider value={availableValues}>
            {children}
        </TranslationFileContext.Provider>
    );
};

export const useTranslationFile = () => {
    const translationContext = useContext(TranslationFileContext);

    if (!translationContext) {
        throw new Error("useTranslationFile must be used within a TranslationFileProvider");
    }

    return translationContext;
};
