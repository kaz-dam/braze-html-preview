import { LokaliseRelatedValues, MondayColumn, MondayQueryData, MondayResponse } from "@/types/monday";
import { BaseProjectManagementStrategy } from "../contracts/base-project-management-strategy";
import ApiError from "@/lib/api-error";
import { Channel } from "@/types/templates";

export default class MondayProjectManagementStrategy extends BaseProjectManagementStrategy {
    private token: string;
    private httpHeaders: Headers;
    private mondayUrl: string;

    constructor() {
        super();

        this.mondayUrl = "https://api.monday.com/v2";
        this.token = process.env.MONDAY_API_TOKEN || "";
        this.httpHeaders = new Headers({
            "Authorization": this.token,
            "Content-Type": "application/json"
        });
    }

    async getProjectItemById(itemId: number): Promise<any> {
        const query = `
        query($itemId: [Int]) {
            items (ids: $itemId) {
                parent_item {
                    id
                    name
                    column_values {
                        id
                        title
                        value
                        text
                    }
                }
                column_values {
                    id
                    title
                    value
                    text
                }
            }
        }`;

        const queryData: MondayQueryData = {
            query,
            variables: { itemId }
        };

        const data: MondayResponse = await this.requestToMondayApi(queryData);

        if (!data.data?.items[0].column_values.length) {
            throw new ApiError(404, "Monday item not found.");
        }

        return this.prepareTranslationDataFromMonday(data);
    }

    parseColumnsForName(columns: MondayColumn[], columnName: string): MondayColumn | string {
        for (const column of columns) {
            const columnTitle = column.title.toLowerCase();

            if (columnTitle.includes(columnName.toLowerCase())) {
                return {
                    ...column,
                    value: typeof(column.value) === "string" ?
                        JSON.parse(column.value) :
                        column.value
                };
            }
        }

        return columnName;
    }

    prepareTranslationDataFromMonday(data: MondayResponse): LokaliseRelatedValues {
        const lokaliseProjectColumn = this.parseColumnsForName(data.data?.items[0].column_values, "lokalise");
        const languageColumn = this.parseColumnsForName(data.data?.items[0].column_values, "language");
        const lokaliseTaskColumn = this.parseColumnsForName(data.data?.items[0].column_values, "lokalise task");
        const parentItemChannelColumn = this.parseColumnsForName(data.data?.items[0].parent_item?.column_values, "channel");
        const parentItemTemplateNameColumn = this.parseColumnsForName(data.data?.items[0].parent_item?.column_values, "template file");
        const parentItemName = data.data?.items[0].parent_item?.name;

        if (typeof(lokaliseProjectColumn) === "string" || 
            typeof(lokaliseTaskColumn) === "string" || 
            typeof(parentItemChannelColumn) === "string" || 
            typeof(parentItemTemplateNameColumn) === "string" ||
            typeof(languageColumn) === "string") {
            const columnName = lokaliseProjectColumn || lokaliseTaskColumn || parentItemChannelColumn || languageColumn || parentItemTemplateNameColumn;
            throw new ApiError(404, `Monday item column "${columnName}" not found.`);
        }

        return {
            lokaliseProjectUrl: lokaliseProjectColumn?.value?.url,
            lokaliseTaskUrl: lokaliseTaskColumn?.value?.url,
            parentItemId: Number(data.data?.items[0].parent_item?.id),
            channel: parentItemChannelColumn?.text?.toLowerCase() as Channel,
            template: parentItemTemplateNameColumn?.text,
            language: languageColumn?.text,
            itemName: parentItemName
        };
    }

    async requestToMondayApi(queryData: MondayQueryData): Promise<MondayResponse> {
        try {
            const response: Response = await fetch(this.mondayUrl, {
                method: "POST",
                headers: this.httpHeaders,
                body: JSON.stringify(queryData)
            });
    
            return response.json();
        } catch (error: any) {
            throw new Error("Error making request to Monday.com API.");
        }
    }
}