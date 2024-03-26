import { Octokit } from "octokit";
import { BaseTemplateStrategy } from "../contracts/base-template-strategy";
import { Buffer } from "buffer";

export default class GitHubTemplateStrategy extends BaseTemplateStrategy {
    private octokit: Octokit;

    constructor() {
        super();

        this.octokit = new Octokit({
            auth: process.env.GITHUB_ACCESS_TOKEN
        });
    }

    async getFileContent(fileRelativePath: string): Promise<string> {
        const content = await this.octokit.request("/repos/{owner}/{repo}/contents/{path}", {
            owner: process.env.GITHUB_REPO_OWNER,
            repo: process.env.GITHUB_REPO_NAME,
            path: fileRelativePath
        });

        const decodedContent = Buffer.from(content.data.content, "base64").toString("utf-8");

        return decodedContent;
    }
}