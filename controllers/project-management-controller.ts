import ProjectManagementService from "@/services/project-management-service";
import TranslationService from "@/services/translation-service";
import { LokaliseRelatedValues } from "@/types/monday";
import { ProjectManagementAttributes } from "@/types/project-management";

export default class ProjectManagementController {
    private projectManagementService: ProjectManagementService;
    private translationService: TranslationService;
    
    constructor(
        projectManagementService: ProjectManagementService,
        translationService: TranslationService
    ) {
        this.projectManagementService = projectManagementService;
        this.translationService = translationService;
    }

    async getProjectItem(req: Request, itemId: number): Promise<ProjectManagementAttributes> {
        try {
            const projectItem: LokaliseRelatedValues = await this.projectManagementService.getProjectItemById(itemId);
            const lokaliseProjectId = this.translationService.parseProjectIdFromUrl(projectItem?.lokaliseProjectUrl);
            const lokaliseTaskId = this.translationService.parseTaskIdFromUrl(projectItem?.lokaliseTaskUrl);
            
            return {
                ...projectItem,
                lokaliseProjectId,
                lokaliseTaskId
            };
        } catch (error: any) {
            console.error(new Date(), error);
            throw error;
        }
    }
}