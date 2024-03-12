import { Channel, OctokitData } from "@/types/templates";
import { OctokitResponse } from "@octokit/types";

export default interface TemplateStrategy {
    getTemplate(channel: Channel): Promise<OctokitResponse<OctokitData, number>>;

    getTemplateContent(octoresponse: OctokitResponse<OctokitData, number>): Promise<string>;

    parseTemplateForContentBlocks(templateContent: string): string[];

    getAllContentBlocks(contentBlockList: string[]): Promise<void>;
}