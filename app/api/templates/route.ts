import templateService from "@/lib/template-service";

export async function GET(request: Request) {
    // if module name contains 'static' then only pull the specific content block
    // if module name contains 'dynamic' then pull the content block name from the module name
    // parse that one content block and pull every content block template that is in it.

    const template = await templateService.getTemplate("iam");
    const pathToFile = await templateService.createLocalFile(template);

    return Response.json(pathToFile);
}