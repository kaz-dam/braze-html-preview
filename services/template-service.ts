import { OctokitResponse } from "@octokit/types";
import { Octokit } from "octokit";
import path from "path";
import { writeFile } from "fs/promises";
import { Channel, OctokitData } from "@/types/templates";
import { mkdirSync } from "fs";

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
        const urlPath = path.join("temp", templateName);

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

    getTemplate(channel: Channel): Promise<OctokitResponse<OctokitData, number>> {
        const path = channel + "-template.html";
        return this.request(path);
    }

    getTemplateContent(octoresponse: OctokitResponse<OctokitData, number>): string {
        return Buffer.from(octoresponse.data.content, octoresponse.data.encoding).toString("utf-8");
    }

    getContentBlock(contentBlockName: string): Promise<OctokitResponse<OctokitData, number>> {
        const path = "content_blocks/" + contentBlockName + ".liquid";
        return this.request(path);
    }

    getAllContentBlocks(contentBlockList: string[]): void {
        contentBlockList.forEach(async contentBlock => {
            const contentBlockTemplate = await this.getContentBlock(contentBlock);
            const contentBlockTemplateContent = this.getTemplateContent(contentBlockTemplate);
            const contentBlockContentBlocks = this.parseTemplateForContentBlocks(contentBlockTemplateContent);
            await this.createLocalFile(contentBlockTemplateContent, contentBlockTemplate.data.name, true);

            if (contentBlockContentBlocks.length > 0) {
                this.getAllContentBlocks(contentBlockContentBlocks);
            }
        });
    }

    getLiquidContext(): Promise<OctokitResponse<OctokitData, number>> {
        return this.request("liquid-context.json");
    }

    private request(path: string): Promise<OctokitResponse<OctokitData, number>> {
        return this.octokit.request("/repos/{owner}/{repo}/contents/{path}", {
            owner: process.env.GITHUB_REPO_OWNER,
            repo: process.env.GITHUB_REPO_NAME,
            path: path
        });
    }
}

export default new TemplateService();