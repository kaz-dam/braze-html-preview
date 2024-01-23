type LokaliseColumnValue = {
    url: string;
    text: string;
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
                column_values(ids: "link5") {
                    id
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
            const response: any = await fetch(this.mondayUrl, {
                method: "POST",
                headers: this.httpHeaders,
                body: JSON.stringify(queryData)
            });

            const data = await response.json();
            return JSON.parse(data.data?.items[0]?.column_values[0].value);
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export default new MondayService();