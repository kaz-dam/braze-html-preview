import { OctokitResponse } from "@octokit/types";
import { Octokit } from "octokit";
import path from "path";
import { writeFile } from "fs/promises";
import { Channel, OctokitData } from "@/types/templates";
import brazeLiquidService from "./braze-liquid-service";

class TemplateService {
    private octokit: Octokit;

    constructor() {
        this.octokit = new Octokit({
            auth: process.env.GITHUB_ACCESS_TOKEN
        });
    }

    async createLocalFile(template: OctokitResponse<OctokitData, number>): Promise<string>  {
        const content = this.getTemplateContent(template);
        const filePath = path.join(process.cwd(), "public", "temp", template.data.name);
        const urlPath = path.join("temp", template.data.name);

        this.parseTemplateForContentBlocks(template);

        // const tpl = brazeLiquidService.parseString(content);
        // const renderedContent = await brazeLiquidService.renderTemplate(tpl);

        await writeFile(filePath, content);

        return urlPath;
    }

    parseTemplateForContentBlocks(template: OctokitResponse<OctokitData, number>): string[] {
        const content = this.getTemplateContent(template);
        const regex = /(?<=\{\{content_blocks\.\$\{)(.*?)(?=\}\}\})/g;
        const matches = content.match(regex);
        
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