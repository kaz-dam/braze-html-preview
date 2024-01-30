import { LiquidContext, LiquidContextSecret } from "@/types/templates";

class LiquidContextModel {
    private context: LiquidContext;

    constructor(context: LiquidContext) {
        this.context = context;
        this.setApiAuthPassword("martech_personalization", this.getApiAuthPassword("martech_personalization"));
        this.setApiAuthPassword("max-cc-prod_v2", this.getApiAuthPassword("max-cc-prod_v2"));
    }

    setApiAuthPassword(secretName: string, password: string): void {
        this.context.__secrets[secretName].password = password;
    }

    setContentBlockRoot(root: string): void {
        this.context.__contentBlocks.root = root;
    }

    setCampaignName(campaignName: string): void {
        this.context.campaign.name = campaignName;
    }

    setTranslationObject(translation: any): void {
        this.context.json_data = translation;
    }

    getApiAuthName(name: string): LiquidContextSecret {
        return this.context.__secrets[name];
    }

    getApiAuthPassword(secretName: string): string {
        const envName = secretName.toUpperCase().replaceAll("-", "_");

        return process.env[envName] || "";
    }

    getContextObejct(): LiquidContext {
        return this.context;
    }
}

export default LiquidContextModel;