import { NextApiRequest } from "next";
import mondayService from "@/lib/monday-service";
import translationService from "@/lib/translation-service";
import { TranslationRouteResponse, TranslationsRouteParams } from "@/types/translations";

export async function GET(
    request: NextApiRequest,
    { params }: TranslationsRouteParams
) {
    const mondayId = params.mondayid;

    if (!mondayId) return Response.json("Please type in the monday id");

    const lokaliseUrlColumnValue = await mondayService.getMondayItemLokaliseColumn(Number(mondayId));
    
    if (lokaliseUrlColumnValue) {
        const projectId = translationService.parseProjectIdFromUrl(lokaliseUrlColumnValue?.url);
        const translation = await translationService.getTranslationFileContent(projectId, mondayId);
        
        const response: TranslationRouteResponse = {
            projectId,
            translation
        };
        
        return Response.json(response);
    }

    return Response.json("No lokalise url found in monday.com");
}