import mondayService from "@/lib/monday-service";
import translationService from "@/lib/translation-service";

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const mondayId = requestUrl.searchParams.get("mondayId") || null;

    if (!mondayId) return Response.json("Please type in the monday id");

    const lokaliseUrlColumnValue = await mondayService.getMondayItemLokaliseColumn(Number(mondayId));
    
    if (lokaliseUrlColumnValue) {
        const projectId = translationService.parseProjectIdFromUrl(lokaliseUrlColumnValue?.url);
        const translation = await translationService.getTranslationFileContent(projectId, "5442459925");
        
        return Response.json(translation);
    }
}