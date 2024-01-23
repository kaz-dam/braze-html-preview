import { NextRequest } from "next/server";
import TemplateController from "@/controllers/template-controller";

export async function GET(request: NextRequest) {
    return TemplateController.getAlwaysOnTemplate(request);
}