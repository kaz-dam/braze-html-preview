import brazeLiquidService from "@/services/braze-liquid-service";
import mondayService from "@/services/monday-service";
import templateService from "@/services/template-service";
import translationService from "@/services/translation-service";
import { TranslationIds, TranslationRouteResponse } from "@/types/translations";
import { NextRequest, NextResponse } from "next/server";

class TranslationController {
    static async getTranslationByMondayId(req: NextRequest, params: TranslationIds): Promise<NextResponse> {
        const mondayId = params.mondayId;

        if (!mondayId) return NextResponse.json("Please type in the monday id");

        const lokaliseInfo = await mondayService.getMondayItemLokaliseColumn(Number(mondayId));
        
        if (lokaliseInfo) {
            const projectId = translationService.parseProjectIdFromUrl(lokaliseInfo?.lokaliseProjectUrl);
            const taskId = translationService.parseTaskIdFromUrl(lokaliseInfo?.lokaliseTaskUrl);
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
            
            return NextResponse.json(response);
        }

        return NextResponse.json("No lokalise url found in monday.com");
    }
}

export default TranslationController;