import axios, { AxiosInstance } from "axios";

type LokaliseColumnValue = {
    url: string;
    text: string;
};

class MondayService {
    private token: string;
    private httpInstance: AxiosInstance;
    private mondayUrl: string;

    constructor() {
        this.mondayUrl = "https://api.monday.com/v2";
        this.token = process.env.MONDAY_API_TOKEN || "";

        this.httpInstance = axios.create({
            baseURL: this.mondayUrl,
            headers: {
                "Authorization": this.token,
                "Content-Type": "application/json"
            }
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

        const data = {
            query,
            variables: { itemId }
        };

        try {
            const response = await this.httpInstance.get("/", { data });
            return JSON.parse(response.data.data.items[0].column_values[0].value);
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

export default new MondayService();