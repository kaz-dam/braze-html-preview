"use client";

import { View } from "@/types/component";
import { Dispatch, createContext, useContext, useState } from "react";

type PreviewContextType = {
    templatePath: string;
    setTemplatePath: Dispatch<string>;
    mondayItemIsLoading: boolean;
    setMondayItemIsLoading: Dispatch<boolean>;
    selectedView: View;
    setSelectedView: Dispatch<View>;
};

const defaultContextValue: PreviewContextType = {
    templatePath: "",
    setTemplatePath: () => {},
    mondayItemIsLoading: false,
    setMondayItemIsLoading: () => {},
    selectedView: View.MOBILE,
    setSelectedView: () => {},
};

const PreviewContext = createContext<PreviewContextType>(defaultContextValue);

export const PreviewProvider = ({ children }: { children: React.ReactNode }) => {
    const [ templatePath, setTemplatePath ] = useState<string>("");
    const [ mondayItemIsLoading, setMondayItemIsLoading ] = useState<boolean>(false);
    const [ selectedView, setSelectedView ] = useState<View>(View.MOBILE);

    return (
        <PreviewContext.Provider value={{
            templatePath,
            setTemplatePath,
            mondayItemIsLoading,
            setMondayItemIsLoading,
            selectedView,
            setSelectedView
        }}>
            {children}
        </PreviewContext.Provider>
    );
};

export const usePreview = () => useContext(PreviewContext);