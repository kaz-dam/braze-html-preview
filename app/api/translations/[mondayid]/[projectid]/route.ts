import { NextApiRequest } from "next";
import translationService from "@/lib/translation-service";
import { TranslationsRouteParams } from "@/types/translations";

export async function GET(
    request: NextApiRequest,
    { params }: TranslationsRouteParams
) {
    const mondayId = params.mondayid;
    const projectId = params.projectid;

    // test mondayid: 5442459925
    const translation = await translationService.getTranslationFileContent(projectId, mondayId);
    
    return Response.json(translation);
}