import { OctokitData } from "@/types/templates";
import Liquid from "brazejs";
import templateService from "./template-service";
import { OctokitResponse } from "@octokit/types";
import ITemplate from "brazejs/dist/template/itemplate";

class BrazeLiquidService {
    private liquidEngine: Liquid;
    private liquidContext: OctokitResponse<OctokitData, number> | undefined;

    constructor() {
        this.liquidEngine = new Liquid({
            cache: true
        });
        this.setContext();
    }

    async setContext(): Promise<void> {
        this.liquidContext = await templateService.getLiquidContext();
    }

    parseString(string: string) {
        return this.liquidEngine.parse(string);
    }

    renderTemplate(template: ITemplate[]): Promise<string> {
        return this.liquidEngine.render(template, this.liquidContext?.data);
    }
}

export default new BrazeLiquidService();