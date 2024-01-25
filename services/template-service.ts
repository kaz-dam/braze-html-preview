import { OctokitResponse } from "@octokit/types";
import { Octokit } from "octokit";
import path from "path";
import { writeFile } from "fs/promises";
import { Channel, OctokitData } from "@/types/templates";

class TemplateService {
    private octokit: Octokit;

    constructor() {
        this.octokit = new Octokit({
            auth: process.env.GITHUB_ACCESS_TOKEN
        });
    }

    async createLocalFile(templateContent: string, templateName: string): Promise<string>  {
        const filePath = path.join(process.cwd(), "public", "temp", templateName);
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