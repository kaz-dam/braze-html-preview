import { LokaliseRelatedValues, MondayColumn, MondayQueryData, MondayResponse, MondayResponseItem } from "@/types/monday";


class MondayService {
    private token: string;
    private httpHeaders: Headers;
    private mondayUrl: string;

    constructor() {
        this.mondayUrl = "https://api.monday.com/v2";
        this.token = process.env.MONDAY_API_TOKEN || "";
        this.httpHeaders = new Headers({
            "Authorization": this.token,
            "Content-Type": "application/json"
        });
    }

    async getMondayItemLokaliseColumn(itemId: number): Promise<LokaliseRelatedValues | null> {
        const query = `query($itemId: [Int]) {
            items (ids: $itemId) {
                parent_item {
                    id
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

        try {
            const data: MondayResponse = await this.requestToMondayApi(queryData);

            return this.prepareTranslationDataFromMonday(data);
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    parseColumnsForName(item: MondayResponseItem, columnName: string): MondayColumn | null {
        for (const column of item.column_values) {
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

        return null;
    }

    prepareTranslationDataFromMonday(data: MondayResponse): LokaliseRelatedValues {
        const lokaliseProjectColumn = this.parseColumnsForName(data.data?.items[0], "lokalise");
        const languageColumn = this.parseColumnsForName(data.data?.items[0], "language");
        const lokaliseTaskColumn = this.parseColumnsForName(data.data?.items[0], "lokalise task");

        if (lokaliseProjectColumn && languageColumn && lokaliseTaskColumn) {
            return {
                lokaliseProjectUrl: lokaliseProjectColumn?.value.url,
                lokaliseTaskUrl: lokaliseTaskColumn?.value.url ,
                parentItemId: Number(data.data?.items[0].parent_item?.id),
                language: languageColumn?.text
            };
        }

        return {
            lokaliseProjectUrl: "",
            lokaliseTaskUrl: "",
            parentItemId: 0,
            language: ""
        };
    }

    async requestToMondayApi(queryData: MondayQueryData): Promise<MondayResponse> {
        const response: Response = await fetch(this.mondayUrl, {
            method: "POST",
            headers: this.httpHeaders,
            body: JSON.stringify(queryData)
        });

        return response.json();
    }
}

export default new MondayService();