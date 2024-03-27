import { LokaliseRelatedValues } from "@/types/monday";

export abstract class BaseProjectManagementStrategy {
    abstract getProjectItemById(itemId: number | string): Promise<LokaliseRelatedValues>;
}