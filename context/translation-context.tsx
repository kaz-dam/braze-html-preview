"use client";

import { TranslationContextType } from "@/types/translations";
import { createContext, useContext, useState } from "react";

const defaultContextValue: TranslationContextType = {
    mondayId: 0,
    mondayParentId: 0,
    language: "",
    projectId: "",
    setMondayId: () => {},
    setMondayParentId: () => {},
    setLanguage: () => {},
    setProjectId: () => {}
};

const TranslationContext = createContext<TranslationContextType>(defaultContextValue);

export const TranslationFileProvider = ({ children }: React.PropsWithChildren) => {
    const [ mondayId, setMondayId ] = useState<number>();
    const [ mondayParentId, setMondayParentId ] = useState<number>();
    const [ language, setLanguage ] = useState<string>();
    const [ projectId, setProjectId ] = useState<string>();

    const availableValues = {
        mondayId,
        mondayParentId,
        language,
        projectId,
        setMondayId,
        setMondayParentId,
        setLanguage,
        setProjectId
    };

    return (
        <TranslationContext.Provider value={availableValues}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslation = () => useContext(TranslationContext);
