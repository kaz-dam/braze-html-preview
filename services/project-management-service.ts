import { BaseProjectManagementStrategy } from "@/contracts/base-project-management-strategy";

export default class ProjectManagementService {
    private strategy: BaseProjectManagementStrategy;

    constructor(strategy: BaseProjectManagementStrategy) {
        this.strategy = strategy;
    }

    async getProjectItemById(itemId: number): Promise<any> {
        return this.strategy.getProjectItemById(itemId);
    }
}