import brazeLiquidService from "@/services/braze-liquid-service";
import mondayService from "@/services/monday-service";
import templateService from "@/services/template-service";
import TranslationService from "@/services/translation-service";
import { TranslationIds, TranslationRouteResponse } from "@/types/translations";

class TranslationController {
    static async getTranslationByMondayId(req: Request, params: TranslationIds): Promise<TranslationRouteResponse> {
        const mondayId = params.mondayId;
        const translationService = new TranslationService(process.env.LOKALISE_API_TOKEN || "");

        try {
            const lokaliseInfo = await mondayService.getMondayItemLokaliseColumn(Number(mondayId));
        
            const projectId = translationService.parseProjectIdFromUrl(lokaliseInfo?.lokaliseProjectUrl || "");
            const taskId = translationService.parseTaskIdFromUrl(lokaliseInfo?.lokaliseTaskUrl || "");
            const translation = await translationService.getTranslationFileContent(projectId, taskId);

            // const template = await templateService.getTemplate(lokaliseInfo?.channel ?? "iam");
            const template = await templateService.getTemplate("iam");
            const templateContent = templateService.getTemplateContent(template);
            const contentBlocks = templateService.parseTemplateForContentBlocks(templateContent);
            templateService.getAllContentBlocks(contentBlocks);

            brazeLiquidService.addTranslationToContext(translation);
            const tpl = brazeLiquidService.parseString(templateContent);
            const renderedContent = await brazeLiquidService.renderTemplate(tpl);
            
            const pathToFile = await templateService.createLocalFile(renderedContent, template.data.name);
            
            const response: TranslationRouteResponse = {
                pathToFile
            };
            
            return response;
        } catch (error: any) {
            console.error(new Date(), error);
            throw error;
        }
    }
}

export default TranslationController;