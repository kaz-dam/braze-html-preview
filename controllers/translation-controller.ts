import brazeLiquidService from "@/services/braze-liquid-service";
import mondayService from "@/services/monday-service";
import templateService from "@/services/template-service";
import translationService from "@/services/translation-service";
import { LanguageCode, TranslationIds, TranslationRouteResponse } from "@/types/translations";
import { NextRequest, NextResponse } from "next/server";

class TranslationController {
    static async getTranslationByMondayId(req: NextRequest, params: TranslationIds) {
        const mondayId = params.mondayId;

        if (!mondayId) return NextResponse.json("Please type in the monday id");

        const lokaliseInfo = await mondayService.getMondayItemLokaliseColumn(Number(mondayId));
        
        if (lokaliseInfo) {
            const projectId = translationService.parseProjectIdFromUrl(lokaliseInfo?.lokaliseUrl);
            const translation = await translationService.getTranslationFileContent(projectId, lokaliseInfo.parentItemId, lokaliseInfo.language);

            const template = await templateService.getTemplate("iam");
            const templateContent = templateService.getTemplateContent(template);
            const contentBlocks = templateService.parseTemplateForContentBlocks(templateContent);
            templateService.getAllContentBlocks(contentBlocks);

            brazeLiquidService.addTranslationToContext(translation);
            const tpl = brazeLiquidService.parseString(templateContent);
            const renderedContent = await brazeLiquidService.renderTemplate(tpl);
            
            const pathToFile = await templateService.createLocalFile(renderedContent, template.data.name);
            
            const response: TranslationRouteResponse = {
                projectId,
                mondayParentId: lokaliseInfo.parentItemId,
                language: lokaliseInfo.language,
                pathToFile
            };
            
            return NextResponse.json(response);
        }

        return NextResponse.json("No lokalise url found in monday.com");
    }

    static async getTranslationByProjectId(req: NextRequest, params: TranslationIds) {
        const mondayItemParentId = params.mondayId;
        const projectId = params.projectId;
        const { searchParams } = new URL(req.url);
        const language: LanguageCode = searchParams.get("language") as LanguageCode || "ENG";

        if (!mondayItemParentId) return NextResponse.json("Please type in the monday id");
        if (!projectId) return NextResponse.json("Project id is missing");

        const translation = await translationService.getTranslationFileContent(projectId, mondayItemParentId, language);

        const template = await templateService.getTemplate("iam");
        const templateContent = templateService.getTemplateContent(template);
        const contentBlocks = templateService.parseTemplateForContentBlocks(templateContent);
        templateService.getAllContentBlocks(contentBlocks);

        brazeLiquidService.addTranslationToContext(translation);
        const tpl = brazeLiquidService.parseString(templateContent);
        const renderedContent = await brazeLiquidService.renderTemplate(tpl);
        
        const pathToFile = await templateService.createLocalFile(renderedContent, template.data.name);

        const response: any = {
            pathToFile
        };
        
        return NextResponse.json(response);
    }
}

export default TranslationController;