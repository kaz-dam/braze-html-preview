import brazeLiquidService from "@/services/braze-liquid-service";
import templateService from "@/services/template-service";
import { NextRequest, NextResponse } from "next/server";

class TemplateController {
    static async getAlwaysOnTemplate(req: NextRequest) {
        // if module name contains 'static' then only pull the specific content block
        // if module name contains 'dynamic' then pull the content block name from the module name
        // parse that one content block and pull every content block template that is in it.

        const template = await templateService.getTemplate("iam");
        const templateContent = templateService.getTemplateContent(template);
        const contentBlocks = templateService.parseTemplateForContentBlocks(templateContent);

        contentBlocks.forEach(async contentBlock => {
            const contentBlockTemplate = await templateService.getContentBlock(contentBlock);
            const contentBlockTemplateContent = templateService.getTemplateContent(contentBlockTemplate);
            const contentBlockContentBlocks = templateService.parseTemplateForContentBlocks(contentBlockTemplateContent);
            await templateService.createLocalFile(contentBlockTemplateContent, contentBlockTemplate.data.path);
        });

        const tpl = brazeLiquidService.parseString(templateContent);
        const renderedContent = await brazeLiquidService.renderTemplate(tpl);
        
        const pathToFile = await templateService.createLocalFile(renderedContent, template.data.name);

        return NextResponse.json(pathToFile);
    }
};

export default TemplateController;