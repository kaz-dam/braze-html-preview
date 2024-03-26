import path from "path";
import { writeFile } from "fs/promises";
import { Channel } from "@/types/templates";
import { mkdirSync } from "fs";
import { randomUUID } from "crypto";
import ApiError from "@/lib/api-error";
import { BaseTemplateStrategy } from "@/contracts/base-template-strategy";

export default class TemplateService {
    private strategy: BaseTemplateStrategy;

    constructor(strategy: BaseTemplateStrategy) {
        this.strategy = strategy;
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
        const regex = /(?<=\{\{content_blocks\.\$\{)(.*?)(?=\})(\s*\|\s*id:\s*'cb\d+'\}\})?/g;

        const matches = templateContent.match(regex);
        
        if (matches) {
            return matches;
        }

        return [];
    }

    async getTemplate(template: string): Promise<string> {
        const templateContent = await this.strategy.getFileContent(template);

        if (template) {
            return templateContent;
        } else {
            throw new ApiError(404, "Template not found.");
        }
    }

    async getContentBlock(contentBlockName: string): Promise<string> {
        const path = "content_blocks/" + contentBlockName + ".liquid";
        const contentBlock = await this.strategy.getFileContent(path);

        if (contentBlock) {
            return contentBlock;
        } else {
            throw new ApiError(404, "Content block not found.");
        }
    }

    async getAllContentBlocks(contentBlockList: string[]): Promise<void> {
        for (const contentBlock of contentBlockList) {
            const contentBlockTemplate = await this.getContentBlock(contentBlock);
            const contentBlockContentBlocks = this.parseTemplateForContentBlocks(contentBlockTemplate);
            await this.createLocalFile(contentBlockTemplate, contentBlock + ".liquid", true);

            if (contentBlockContentBlocks.length > 0) {
                await this.getAllContentBlocks(contentBlockContentBlocks);
            }
        }
    }

    async getLiquidContext(): Promise<string> {
        const liquidContext = await this.strategy.getFileContent("liquid-context.json");

        if (liquidContext) {
            return liquidContext;
        } else {
            throw new ApiError(404, "Liquid context not found.");
        }
    }
}
