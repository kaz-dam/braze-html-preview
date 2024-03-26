"use client";

import { Dispatch, createContext, useContext, useState } from "react";

type ProjectInfoContextType = {
    itemTitle: string;
    setItemTitle: Dispatch<string>;
    projectChannel: string;
    setProjectChannel: Dispatch<string>;
    projectLanguage: string;
    setProjectLanguage: Dispatch<string>;
    projectTemplate: string;
    setProjectTemplate: Dispatch<string>;
};

const defaultContextValue: ProjectInfoContextType = {
    itemTitle: "",
    setItemTitle: () => {},
    projectChannel: "",
    setProjectChannel: () => {},
    projectLanguage: "",
    setProjectLanguage: () => {},
    projectTemplate: "",
    setProjectTemplate: () => {},
};

const ProjectInfoContext = createContext<ProjectInfoContextType>(defaultContextValue);

export const ProjectInfoProvider = ({ children }: { children: React.ReactNode }) => {
    const [ itemTitle, setItemTitle ] = useState<string>("");
    const [ projectChannel, setProjectChannel ] = useState<string>("");
    const [ projectLanguage, setProjectLanguage ] = useState<string>("");
    const [ projectTemplate, setProjectTemplate ] = useState<string>("");

    return (
        <ProjectInfoContext.Provider value={{
            itemTitle,
            setItemTitle,
            projectChannel,
            setProjectChannel,
            projectLanguage,
            setProjectLanguage,
            projectTemplate,
            setProjectTemplate
        }}>
            {children}
        </ProjectInfoContext.Provider>
    );
};

export const useProjectInfo = () => useContext(ProjectInfoContext);