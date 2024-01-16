import mondayService from "@/lib/monday-service";
import translationService from "@/lib/translation-service";

export async function GET(request: Request) {
    const lokaliseUrlColumnValue = await mondayService.getMondayItemLokaliseColumn(5442459925);
    
    if (lokaliseUrlColumnValue) {
        const projectId = translationService.parseProjectIdFromUrl(lokaliseUrlColumnValue?.url);
        // const project = await translationService.getSingleProject(projectId);
        const project = await translationService.getProjects();
        console.log(project);
        return Response.json(project);
    }

    // return the translation json for the specific monday id
    return Response.json("done");
}