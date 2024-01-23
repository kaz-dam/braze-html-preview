import { NextApiRequest } from "next";
import mondayService from "@/lib/monday-service";
import translationService from "@/lib/translation-service";
import { TranslationsRouteParams } from "@/types/translations";

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
        
        return Response.json(translation);
    }

    return Response.json("No lokalise url found in monday.com");
}