import mondayService from "@/services/monday-service";
import translationService from "@/services/translation-service";
import { TranslationIds, TranslationRouteResponse } from "@/types/translations";
import { NextRequest, NextResponse } from "next/server";

class TranslationController {
    static async getTranslationByMondayId(req: NextRequest, params: TranslationIds) {
        const mondayId = params.mondayid;

        if (!mondayId) return NextResponse.json("Please type in the monday id");

        const lokaliseUrlColumnValue = await mondayService.getMondayItemLokaliseColumn(Number(mondayId));
        
        if (lokaliseUrlColumnValue) {
            const projectId = translationService.parseProjectIdFromUrl(lokaliseUrlColumnValue?.url);
            const translation = await translationService.getTranslationFileContent(projectId, mondayId);
            
            const response: TranslationRouteResponse = {
                projectId,
                translation
            };
            
            return NextResponse.json(response);
        }

        return NextResponse.json("No lokalise url found in monday.com");
    }

    static async getTranslationByProjectId(req: NextRequest, params: TranslationIds) {
        const mondayId = params.mondayid;
        const projectId = params.projectid;

        // test mondayid: 5442459925
        const translation = await translationService.getTranslationFileContent(projectId, mondayId);
        
        return NextResponse.json(translation);
    }
}

export default TranslationController;