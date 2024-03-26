import ProjectManagementController from "@/controllers/project-management-controller";
import TranslationController from "@/controllers/translation-controller";
import BrazeLiquidService from "@/services/braze-liquid-service";
import ProjectManagementService from "@/services/project-management-service";
import TemplateService from "@/services/template-service";
import { BaseProjectManagementStrategy } from "@/contracts/base-project-management-strategy";
import { BaseTemplateStrategy } from "@/contracts/base-template-strategy";
import GitHubTemplateStrategy from "@/strategies/github-template-strategy";
import LocalTemplateStrategy from "@/strategies/local-template-strategy";
import MondayProjectManagementStrategy from "@/strategies/monday-project-management-strategy";

export default class AppServiceProvider {
    static async createTranslationController(): Promise<TranslationController> {
        let templateStrategy: BaseTemplateStrategy;

        switch (process.env.TEMPLATE_STRATEGY) {
            case "local":
                templateStrategy = new LocalTemplateStrategy();
                break;
            case "github":
                templateStrategy = new GitHubTemplateStrategy();
                break;
            default:
                templateStrategy = new LocalTemplateStrategy();
                break;
        }

        const templateService = new TemplateService(templateStrategy);
        const context = await templateService.getLiquidContext();
        const brazeLiquidService = new BrazeLiquidService(context);
        
        return new TranslationController(templateService, brazeLiquidService);
    }

    static async createProjectManagementController(): Promise<ProjectManagementController> {
        let projectManagementStrategy: BaseProjectManagementStrategy;
        
        switch (process.env.PROJECT_MANAGEMENT_STRATEGY) {
            case "monday":
                projectManagementStrategy = new MondayProjectManagementStrategy();
                break;
            default:
                projectManagementStrategy = new MondayProjectManagementStrategy();
                break;
        }

        const projectManagementService = new ProjectManagementService(projectManagementStrategy);
        
        return new ProjectManagementController(projectManagementService);
    }
}