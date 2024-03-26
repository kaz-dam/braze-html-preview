import ProjectManagementService from "@/services/project-management-service";

export default class ProjectManagementController {
    private projectManagementService: ProjectManagementService;
    
    constructor(
        projectManagementService: ProjectManagementService
    ) {
        this.projectManagementService = projectManagementService;
    }

    async getProjectItem(req: Request, itemId: number): Promise<any> {
        try {
            const projectItem = await this.projectManagementService.getProjectItemById(itemId);
            
            return projectItem;
        } catch (error: any) {
            console.error(new Date(), error);
            throw error;
        }
    }
}