import Liquid from "brazejs";
import path from "path";
import ITemplate from "brazejs/dist/template/itemplate";
import templateService from "./template-service";
import LiquidContextModel from "@/models/liquid-context-model";
import { TranslationObject } from "@/types/translations";
import ApiError from "@/lib/api-error";

class BrazeLiquidService {
    private liquidEngine: Liquid;
    private liquidContext: LiquidContextModel | undefined;

    constructor() {
        this.liquidEngine = new Liquid({
            cache: false
        });
        this.setContext();
    }

    async setContext(): Promise<void> {
        const context = await templateService.getLiquidContext();
        const contextContent = await templateService.getTemplateContent(context);
        this.liquidContext = new LiquidContextModel(JSON.parse(contextContent));
        this.liquidContext.setContentBlockRoot(path.join(process.cwd(), "public", "temp", "content_blocks"));
    }

    parseString(string: string): ITemplate[] {
        // try {
            const parsedHtml = this.liquidEngine.parse(string);
            return parsedHtml;
        // } catch (error) {
        //     throw new ApiError(500, "Error parsing liquid template.");
        // }
    }

    addTranslationToContext(translation: TranslationObject): void {
        this.liquidContext?.setTranslationObject(translation);
    }

    async renderTemplate(template: ITemplate[]): Promise<string> {
        // try {
            const renderedHtml = await this.liquidEngine.render(template, this.liquidContext?.getContextObject());
            return renderedHtml;
        // } catch (error) {
        //     throw new ApiError(500, "Error rendering liquid template.");
        // }
    }
}

export default new BrazeLiquidService();