import { OctokitResponse } from "@octokit/types";
import { Octokit } from "octokit";
import path from "path";
import { writeFile } from "fs/promises";

type Channel = "iam" | "eml" | "pn";

type OctokitData = {
    content: ArrayBuffer;
    encoding: number;
    name: string;
    path: string;
};

class TemplateService {
    private octokit: Octokit;

    constructor() {
        this.octokit = new Octokit({
            auth: process.env.GITHUB_ACCESS_TOKEN
        });
    }

    async createLocalFile(template: OctokitResponse<OctokitData, number>): Promise<string>  {
        const content = Buffer.from(template.data.content, template.data.encoding).toString("utf-8");
        const filePath = path.join(process.cwd(), "public", "temp", template.data.name);
        const urlPath = path.join("temp", template.data.name);

        await writeFile(filePath, content);

        return urlPath;
    }

    getTemplate(channel: Channel): Promise<OctokitResponse<OctokitData, number>> {
        const path = channel + "-template.html";
        return this.request(path);
    }

    getContentBlock(contentBlockName: string): Promise<OctokitResponse<OctokitData, number>> {
        const path = "content_blocks/" + contentBlockName + ".liquid";
        return this.request(path);
    }

    getLiquidContext() {
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