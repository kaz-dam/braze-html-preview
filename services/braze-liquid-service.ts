import Liquid from "brazejs";
import path from "path";
import ITemplate from "brazejs/dist/template/itemplate";
import templateService from "./template-service";
import LiquidContextModel from "@/models/liquid-context-model";

class BrazeLiquidService {
    private liquidEngine: Liquid;
    private liquidContext: LiquidContextModel | undefined;

    constructor() {
        this.liquidEngine = new Liquid({
            cache: true
        });
        this.setContext();
    }

    async setContext(): Promise<void> {
        const context = await templateService.getLiquidContext();
        this.liquidContext = new LiquidContextModel(JSON.parse(templateService.getTemplateContent(context)));
        this.liquidContext.setContentBlockRoot(path.join(process.cwd(), "public", "temp", "content_blocks"));
    }

    parseString(string: string) {
        return this.liquidEngine.parse(string);
    }

    renderTemplate(template: ITemplate[]): Promise<string> {
        if (!this.liquidContext) {
            throw new Error("Liquid context is undefined");
        }
        console.log(this.liquidContext);
        return this.liquidEngine.render(template, this.liquidContext.getContextObejct());
    }
}

export default new BrazeLiquidService();