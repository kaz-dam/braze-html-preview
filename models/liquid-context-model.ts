import { LiquidContext, LiquidContextSecret } from "@/types/templates";

class LiquidContextModel {
    private context: LiquidContext;

    constructor(context: LiquidContext) {
        this.context = context;
    }

    getApiAuthName(name: string): LiquidContextSecret {
        return this.context.__secrets[name];
    }

    getApiAuthPassword(secretName: string): string {
        const envName = secretName.toUpperCase().replaceAll("-", "_");

        return process.env[envName] || "";
    }
}

export default LiquidContextModel;