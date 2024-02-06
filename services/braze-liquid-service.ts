import Liquid from "brazejs";
import path from "path";
import ITemplate from "brazejs/dist/template/itemplate";
import templateService from "./template-service";
import LiquidContextModel from "@/models/liquid-context-model";
import { TranslationObject } from "@/types/translations";

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
        try {
            const context = await templateService.getLiquidContext();
            this.liquidContext = new LiquidContextModel(JSON.parse(templateService.getTemplateContent(context)));
            this.liquidContext.setContentBlockRoot(path.join(process.cwd(), "public", "temp", "content_blocks"));
        } catch (error: any) {
            throw new Error("Error setting liquid context.");
        }
    }

    parseString(string: string): ITemplate[] {
        try {
            return this.liquidEngine.parse(string);
        } catch (error: any) {
            throw new Error("Error parsing liquid string.");
        }
    }

    addTranslationToContext(translation: TranslationObject): void {
        try {
            this.liquidContext?.setTranslationObject(translation);
        } catch (error: any) {
            throw new Error("Error adding translation to liquid context.");
        }
    }

    renderTemplate(template: ITemplate[]): Promise<string> {
        try {
            return this.liquidEngine.render(template, this.liquidContext?.getContextObject());
        } catch (error: any) {
            throw new Error("Error rendering liquid template.");
        }
    }
}

export default new BrazeLiquidService();