type LokaliseColumnValue = {
    url: string;
    text: string;
};

type MondayColumn = {
    id: string;
    title: string;
    value: string;
    text: string;
};

type MondayResponseItem = {
    parent_item: {
        id: string;
    };
    column_values: MondayColumn[];
};

type MondayResponse = {
    data: {
        items: MondayResponseItem[];
    };
};

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

    async getMondayItemLokaliseColumn(itemId: number): Promise<LokaliseColumnValue | null> {
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

        const queryData = {
            query,
            variables: { itemId }
        };

        try {
            const response: Response = await fetch(this.mondayUrl, {
                method: "POST",
                headers: this.httpHeaders,
                body: JSON.stringify(queryData)
            });

            const data: MondayResponse = await response.json();

            const lokaliseColumn = this.parseColumnsForLokaliseRelated(data.data?.items[0]);

            return lokaliseColumn?.value ? JSON.parse(lokaliseColumn.value) : null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    parseColumnsForLokaliseRelated(item: MondayResponseItem): MondayColumn | null {
        for (const column of item.column_values) {
            const columnTitle = column.title.toLowerCase();

            if (columnTitle.includes("lokalise")) {
                return column;
            }
        }

        return null;
    }
}

export default new MondayService();