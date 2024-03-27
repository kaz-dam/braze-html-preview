import { TranslationsRouteParams } from "@/types/translations";
import ApiResponse from "@/lib/api-response";
import { NextRequest } from "next/server";
import AppServiceProvider from "@/providers/app-service-provider";

export const dynamic = "force-dynamic";

export async function GET(
    request: NextRequest,
    { params }: TranslationsRouteParams
) {
    const translationController = await AppServiceProvider.createTranslationController();

    try {
        const translation = await translationController.getTranslationByMondayId(request, params);
        return ApiResponse.success(request, translation);
    } catch (error: any) {
        return ApiResponse.error(request, error.message, error.statusCode);
    }
}