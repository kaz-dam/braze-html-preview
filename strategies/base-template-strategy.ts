import { Channel } from "@/types/templates";
import { randomUUID } from "crypto";
import { mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import path from "path";

export abstract class BaseTemplateStrategy {
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

    async getAllContentBlocks(contentBlockList: string[]): Promise<void> {
        for (const contentBlock of contentBlockList) {
            const contentBlockTemplate = await this.getContentBlock(contentBlock);
            const contentBlockTemplateContent = await this.getTemplateContent(contentBlockTemplate);
            const contentBlockContentBlocks = this.parseTemplateForContentBlocks(contentBlockTemplateContent);
            await this.createLocalFile(contentBlockTemplateContent, contentBlockTemplate.data.name, true);

            if (contentBlockContentBlocks.length > 0) {
                await this.getAllContentBlocks(contentBlockContentBlocks);
            }
        }
    }

    parseTemplateForContentBlocks(templateContent: string): string[] {
        const regex = /(?<=\{\{content_blocks\.\$\{)(.*?)(?=\})(\s*\|\s*id:\s*'cb\d+'\}\})?/g;

        const matches = templateContent.match(regex);
        
        if (matches) {
            return matches;
        }

        return [];
    }

    abstract getTemplate(channel: Channel): Promise<any>;
    abstract getTemplateContent(octoresponse: any): Promise<string>;
    abstract getContentBlock(contentBlock: string): Promise<any>;
}