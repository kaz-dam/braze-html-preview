import { writeFile } from "fs/promises";
import { Octokit } from "octokit";
import path from "path";

export async function GET(request: Request) {
    // console.log(request.body);

    const octokit = new Octokit({
        auth: process.env.GITHUB_ACCESS_TOKEN
    });

    const template = await octokit.request("/repos/{owner}/{repo}/contents/{path}", {
        owner: process.env.GITHUB_REPO_OWNER,
        repo: process.env.GITHUB_REPO_NAME,
        path: "iam-template.html"
    });

    // console.log(template.data);

    const content = Buffer.from(template.data.content, template.data.encoding).toString("utf-8");
    const filePath = path.join(process.cwd(), "public", "temp", "template.html");

    await writeFile(filePath, content);

    return Response.json("template.html");
}