import { Channel } from "@/types/templates";
import { BaseTemplateStrategy } from "./base-template-strategy";
import ApiError from "@/lib/api-error";
import { readFile } from "fs/promises";

export default class LocalTemplateStrategy extends BaseTemplateStrategy {
    constructor() {
        super();
    }

    async getTemplate(channel: Channel): Promise<any> {
        const path = channel + "-template.html";
        const template = await this.readLocalFile(path);

        if (template) {
            return template;
        } else {
            throw new ApiError(404, "Template not found.");
        }
    }

    async getTemplateContent(octoresponse: any): Promise<string> {
        let templateContent: string;

        if (process.env.NODE_ENV === "development") {
            const templateLocalPath = process.env.LOCAL_TEMPLATE_PATH_FOR_DEV ?
                process.env.LOCAL_TEMPLATE_PATH_FOR_DEV + "/" + octoresponse.data.path :
                "";
            readFile(templateLocalPath, "utf-8");
            templateContent = await this.readLocalFile(templateLocalPath);
        } else {
            templateContent = Buffer.from(octoresponse.data.content, octoresponse.data.encoding).toString("utf-8");
        }


        if (templateContent) {
            return templateContent;
        } else {
            throw new ApiError(500, "Error parsing template content.");
        }
    }

    getLiquidContext(): Promise<any> {
        const liquidContext = this.readLocalFile("liquid-context.json");

        if (liquidContext) {
            return liquidContext;
        } else {
            throw new ApiError(404, "Liquid context not found.");
        }
    }

    async getContentBlock(contentBlockName: string): Promise<any> {
        const path = "content_blocks/" + contentBlockName + ".liquid";
        const contentBlock = await this.readLocalFile(path);

        if (contentBlock) {
            return contentBlock;
        } else {
            throw new ApiError(404, "Content block not found.");
        }
    }

    private async readLocalFile(path: string): Promise<string> {
        return await readFile(path, "utf-8");
    }
}