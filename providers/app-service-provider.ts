import TranslationController from "@/controllers/translation-controller";
import BrazeLiquidService from "@/services/braze-liquid-service";
import TemplateService from "@/services/template-service";
import { BaseTemplateStrategy } from "@/strategies/base-template-strategy";
import GitHubTemplateStrategy from "@/strategies/github-template-strategy";
import LocalTemplateStrategy from "@/strategies/local-template-strategy";

export default class AppServiceProvider {
    static async createTranslationController() {
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
}