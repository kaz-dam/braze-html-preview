"use client";

import { TranslationFile, TranslationFileContextType } from "@/types/translations";
import { createContext, useContext, useState } from "react";

const defaultContextValue: TranslationFileContextType = {
    translationFile: {},
    setTranslationFile: () => {},
    getTranslationFileKeys: () => []
};

const TranslationFileContext = createContext<TranslationFileContextType>(defaultContextValue);

export const TranslationFileProvider = ({ children }: React.PropsWithChildren) => {
    const [ translationFile, setTranslationFile ] = useState<TranslationFile>({});

    const getTranslationFileKeys = (): string[] => Object.keys(translationFile);

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

export const useTranslationFile = () => useContext(TranslationFileContext);
