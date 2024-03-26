export abstract class BaseProjectManagementStrategy {
    abstract getProjectItemById(itemId: number | string): Promise<any>;
}