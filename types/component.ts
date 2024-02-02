export enum View {
    MOBILE = 450,
    TABLET = 750,
    DESKTOP = 1100
};

export type HtmlPreviewProps = {
    templatePath: string;
    mondayItemIsLoading?: boolean;
};

export type LoaderProps = {
    className?: string;
};
