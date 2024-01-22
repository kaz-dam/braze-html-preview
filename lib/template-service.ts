import { OctokitResponse } from "@octokit/types";
import { Octokit } from "octokit";

type Channel = "iam" | "eml" | "pn";

type OctokitData = {
    content: ArrayBuffer;
    encoding: number;
};

class TemplateService {
    private octokit: Octokit;

    constructor() {
        this.octokit = new Octokit({
            auth: process.env.GITHUB_ACCESS_TOKEN
        });
    }

    getTemplate(channel: Channel): Promise<OctokitResponse<OctokitData, number>> {
        return this.octokit.request("/repos/{owner}/{repo}/contents/{path}", {
            owner: process.env.GITHUB_REPO_OWNER,
            repo: process.env.GITHUB_REPO_NAME,
            // TODO: handle templates conditionally according to the monday id
            path: channel + "-template.html"
        });
    }
}

export default new TemplateService();