import templateService from "@/services/template-service";
import { NextRequest, NextResponse } from "next/server";

class TemplateController {
    static async getAlwaysOnTemplate(req: NextRequest) {
        // if module name contains 'static' then only pull the specific content block
        // if module name contains 'dynamic' then pull the content block name from the module name
        // parse that one content block and pull every content block template that is in it.

        const template = await templateService.getTemplate("iam");
        const pathToFile = await templateService.createLocalFile(template);

        return NextResponse.json(pathToFile);
    }
};

export default TemplateController;