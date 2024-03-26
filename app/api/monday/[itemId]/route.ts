import { TranslationsRouteParams } from "@/types/translations";
import ApiResponse from "@/lib/api-response";
import { NextRequest } from "next/server";
import AppServiceProvider from "@/providers/app-service-provider";
import { ProjectManagementRouteParams } from "@/types/project-management";

export const dynamic = "force-dynamic";

export async function GET(
    request: NextRequest,
    { params }: ProjectManagementRouteParams
) {
    const projectManagementController = await AppServiceProvider.createProjectManagementController();

    try {
        const projectManagementItem = await projectManagementController.getProjectItem(request, params.itemId);
        return ApiResponse.success(request, projectManagementItem);
    } catch (error: any) {
        return ApiResponse.error(request, error.message, error.statusCode);
    }
}