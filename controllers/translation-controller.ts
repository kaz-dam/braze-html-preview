import BrazeLiquidService from "@/services/braze-liquid-service";
import TemplateService from "@/services/template-service";
import TranslationService from "@/services/translation-service";
import { TranslationIds, TranslationRouteResponse } from "@/types/translations";
import { NextRequest } from "next/server";

class TranslationController {
    private templateService: TemplateService;
    private brazeLiquidService: BrazeLiquidService;

    constructor(
        templateService: TemplateService,
        brazeLiquidService: BrazeLiquidService
    ) {
        this.templateService = templateService;
        this.brazeLiquidService = brazeLiquidService;
    }

    async getTranslationByMondayId(req: NextRequest, params: TranslationIds): Promise<TranslationRouteResponse> {
        const projectId = params.projectId;
        const taskId = params.taskId;
        const templateName = req.nextUrl.searchParams.get("templateName") || "";
        const channelName = req.nextUrl.searchParams.get("channelName") || "";
        const translationService = new TranslationService(process.env.LOKALISE_API_TOKEN || "");

        try {
            const translation = await translationService.getTranslationFileContent(projectId, taskId);

            const template = await this.templateService.getTemplate(templateName);
            const contentBlocks = this.templateService.parseTemplateForContentBlocks(template);
            this.templateService.getAllContentBlocks(contentBlocks);

            this.brazeLiquidService.addTranslationToContext(translation);
            const tpl = this.brazeLiquidService.parseString(template);
            const renderedContent = await this.brazeLiquidService.renderTemplate(tpl);

            const pathToFile = await this.templateService.createLocalFile(renderedContent, templateName || "");

            const response: TranslationRouteResponse = {
                pathToFile
            };

            if (channelName === "pn") {
                const pushMessageRawLiquid = this.brazeLiquidService.parseString(renderedContent);
                const pushMessageRendered = await this.brazeLiquidService.renderTemplate(pushMessageRawLiquid);
                response.translation = pushMessageRendered.trim();
            }
            
            return response;
        } catch (error: any) {
            console.error(new Date(), error);
            throw error;
        }
    }
}

export default TranslationController;