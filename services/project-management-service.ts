import { BaseProjectManagementStrategy } from "@/contracts/base-project-management-strategy";
import { LokaliseRelatedValues } from "@/types/monday";

export default class ProjectManagementService {
    private strategy: BaseProjectManagementStrategy;

    constructor(strategy: BaseProjectManagementStrategy) {
        this.strategy = strategy;
    }

    async getProjectItemById(itemId: number): Promise<LokaliseRelatedValues> {
        return this.strategy.getProjectItemById(itemId);
    }
}