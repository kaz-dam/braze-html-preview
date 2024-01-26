"use client";

import { TranslationContextType } from "@/types/translations";
import { createContext, useContext, useState } from "react";

const defaultContextValue: TranslationContextType = {
    mondayId: 0,
    projectId: "",
    setMondayId: () => {},
    setProjectId: () => {}
};

const TranslationContext = createContext<TranslationContextType>(defaultContextValue);

export const TranslationFileProvider = ({ children }: React.PropsWithChildren) => {
    const [ mondayId, setMondayId ] = useState<number>();
    const [ projectId, setProjectId ] = useState<string>();

    const availableValues = {
        mondayId,
        projectId,
        setMondayId,
        setProjectId
    };

    return (
        <TranslationContext.Provider value={availableValues}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslation = () => useContext(TranslationContext);
