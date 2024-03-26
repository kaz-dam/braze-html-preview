import ProjectManagementService from "@/services/project-management-service";

export default class ProjectManagementController {
    private projectManagementService: ProjectManagementService;
    
    constructor(
        projectManagementService: ProjectManagementService
    ) {
        this.projectManagementService = projectManagementService;
    }

    async getProjectItem(req: Request, itemId: any): Promise<any> {
        const projectId = itemId.projectId;
        
        try {
            const projectItem = await this.projectManagementService.getProjectItemById(projectId);
            
            return projectItem;
        } catch (error: any) {
            console.error(new Date(), error);
            throw error;
        }
    }
}