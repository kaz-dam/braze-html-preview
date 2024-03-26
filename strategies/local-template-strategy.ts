import { BaseTemplateStrategy } from "../contracts/base-template-strategy";
import { readFile } from "fs/promises";
import path from "path";

export default class LocalTemplateStrategy extends BaseTemplateStrategy {
    constructor() {
        super();
    }

    async getFileContent(fileRelativePath: string): Promise<string> {
        const rootPath = process.env.LOCAL_TEMPLATE_PATH_FOR_DEV ?? "";
        const filePath = path.join(rootPath, fileRelativePath);
        
        return await readFile(filePath, "utf-8");
    }
}