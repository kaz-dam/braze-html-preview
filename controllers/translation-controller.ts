import brazeLiquidService from "@/services/braze-liquid-service";
import mondayService from "@/services/monday-service";
import templateService from "@/services/template-service";
import translationService from "@/services/translation-service";
import { TranslationIds, TranslationRouteResponse } from "@/types/translations";
// import { Request, NextResponse } from "next/server";

// TODO: Add error handling
// TODO: Add centralized response handling

class TranslationController {
    static async getTranslationByMondayId(req: Request, params: TranslationIds): Promise<TranslationRouteResponse> {
        const mondayId = params.mondayId;

        try {
            const lokaliseInfo = await mondayService.getMondayItemLokaliseColumn(Number(mondayId));
        
            const projectId = translationService.parseProjectIdFromUrl(lokaliseInfo?.lokaliseProjectUrl || "");
            const taskId = translationService.parseTaskIdFromUrl(lokaliseInfo?.lokaliseTaskUrl || "");
            const translation = await translationService.getTranslationFileContent(projectId, taskId);

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
            throw error;
        }
    }
}

export default TranslationController;