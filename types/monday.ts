export type MondayQueryData = {
    query: string;
    variables: {
        [key: string]: number;
    };
};

export type LokaliseRelatedValues = {
    lokaliseUrl: string;
    parentItemId: number;
    language: string;
};

export type MondayColumn = {
    id: string;
    title: string;
    value: MondayLinkColumn;
    text: string;
};

export type MondayLinkColumn = {
    url: string;
    text: string
};

export type MondayResponseItem = {
    parent_item: {
        id: string;
    };
    column_values: MondayColumn[];
};

export type MondayResponse = {
    data: {
        items: MondayResponseItem[];
    };
};