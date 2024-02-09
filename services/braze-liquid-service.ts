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
        this.liquidContext = new LiquidContextModel(JSON.parse(templateService.getTemplateContent(context)));
        this.liquidContext.setContentBlockRoot(path.join(process.cwd(), "public", "temp", "content_blocks"));
    }

    parseString(string: string): ITemplate[] {
        const parsedHtml = this.liquidEngine.parse(string);

        if (!parsedHtml) {
            throw new ApiError(500, "Error parsing liquid template.");
        }

        return parsedHtml;
    }

    addTranslationToContext(translation: TranslationObject): void {
        this.liquidContext?.setTranslationObject(translation);
    }

    async renderTemplate(template: ITemplate[]): Promise<string> {
        const renderedHtml = await this.liquidEngine.render(template, this.liquidContext?.getContextObject());

        if (!renderedHtml) {
            throw new ApiError(500, "Error rendering liquid template.");
        }

        return renderedHtml;
    }
}

export default new BrazeLiquidService();