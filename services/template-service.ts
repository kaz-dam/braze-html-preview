import { OctokitResponse } from "@octokit/types";
import { Octokit, RequestError } from "octokit";
import path from "path";
import { writeFile } from "fs/promises";
import { Channel, OctokitData } from "@/types/templates";
import { mkdirSync } from "fs";
import { randomUUID } from "crypto";
import ApiError from "@/lib/api-error";

class TemplateService {
    private octokit: Octokit;

    constructor() {
        this.octokit = new Octokit({
            auth: process.env.GITHUB_ACCESS_TOKEN
        });
    }

    async createLocalFile(
        templateContent: string,
        templateName: string,
        isContentBlock: boolean = false
    ): Promise<string>  {
        let filePath: string;

        if (isContentBlock) {
            const dirPath = path.join(process.cwd(), "public", "temp", "content_blocks");
            await mkdirSync(dirPath, { recursive: true });
            filePath = path.join(dirPath, templateName);
        } else {
            filePath = path.join(process.cwd(), "public", "temp", templateName);
        }
        const urlPath = path.join("temp", templateName) + "?v=" + randomUUID();

        await writeFile(filePath, templateContent);

        return urlPath;
    }

    parseTemplateForContentBlocks(templateContent: string): string[] {
        const regex = /(?<=\{\{content_blocks\.\$\{)(.*?)(?=\}\}\})/g;
        const matches = templateContent.match(regex);
        
        if (matches) {
            return matches;
        }

        return [];
    }

    async getTemplate(channel: Channel): Promise<OctokitResponse<OctokitData, number>> {
        const path = channel + "-template.html";
        const template = await this.request(path);

        if (template) {
            return template;
        } else {
            throw new ApiError(404, "Template not found.");
        }
    }

    getTemplateContent(octoresponse: OctokitResponse<OctokitData, number>): string {
        const templateContent = Buffer.from(octoresponse.data.content, octoresponse.data.encoding).toString("utf-8");

        if (templateContent) {
            return templateContent;
        } else {
            throw new ApiError(500, "Error parsing template content.");
        }
    }

    async getContentBlock(contentBlockName: string): Promise<OctokitResponse<OctokitData, number>> {
        const path = "content_blocks/" + contentBlockName + ".liquid";
        const contentBlock = await this.request(path);

        if (contentBlock) {
            return contentBlock;
        } else {
            throw new ApiError(404, "Content block not found.");
        }
    }

    async getAllContentBlocks(contentBlockList: string[]): Promise<void> {
        for (const contentBlock of contentBlockList) {
            const contentBlockTemplate = await this.getContentBlock(contentBlock);
            const contentBlockTemplateContent = this.getTemplateContent(contentBlockTemplate);
            const contentBlockContentBlocks = this.parseTemplateForContentBlocks(contentBlockTemplateContent);
            await this.createLocalFile(contentBlockTemplateContent, contentBlockTemplate.data.name, true);

            if (contentBlockContentBlocks.length > 0) {
                await this.getAllContentBlocks(contentBlockContentBlocks);
            }
        }
    }

    getLiquidContext(): Promise<OctokitResponse<OctokitData, number>> {
        const liquidContext = this.request("liquid-context.json");

        if (liquidContext) {
            return liquidContext;
        } else {
            throw new ApiError(404, "Liquid context not found.");
        }
    }

    private async request(path: string): Promise<OctokitResponse<OctokitData, number>> {
        return await this.octokit.request("/repos/{owner}/{repo}/contents/{path}", {
            owner: process.env.GITHUB_REPO_OWNER,
            repo: process.env.GITHUB_REPO_NAME,
            path: path
        });
    }
}

export default new TemplateService();