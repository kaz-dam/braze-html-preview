import Liquid from "brazejs";
import path from "path";
import ITemplate from "brazejs/dist/template/itemplate";
import LiquidContextModel from "@/models/liquid-context-model";
import { TranslationObject } from "@/types/translations";
import ApiError from "@/lib/api-error";

export default class BrazeLiquidService {
    private liquidEngine: Liquid;
    private liquidContext: LiquidContextModel | undefined;

    constructor(liquidContext: string) {
        this.liquidEngine = new Liquid({
            cache: false
        });
        this.setContext(liquidContext);
    }

    async setContext(liquidContext: string): Promise<void> {
        this.liquidContext = new LiquidContextModel(JSON.parse(liquidContext));
        this.liquidContext.setContentBlockRoot(path.join(process.cwd(), "public", "temp", "content_blocks"));
    }

    parseString(string: string): ITemplate[] {
        try {
            const parsedHtml = this.liquidEngine.parse(string);
            return parsedHtml;
        } catch (error) {
            throw new ApiError(500, "Error parsing liquid template.");
        }
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
