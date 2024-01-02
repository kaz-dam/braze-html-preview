import translationService from "@/lib/translation-service";

export async function GET(request: Request) {
    translationService.setProjectId("some_id_from_request");

    const projects = await translationService.getProjects();

    // console.log(projects);

    // return the translation json for the specific monday id
    return Response.json("done");
}