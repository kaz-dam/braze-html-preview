import { TranslationsRouteParams } from "@/types/translations";
import TranslationController from "@/controllers/translation-controller";
import ApiResponse from "@/lib/api-response";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: TranslationsRouteParams
) {
    try {
        const translation = await TranslationController.getTranslationByMondayId(request, params);
        return ApiResponse.success(request, translation);
    } catch (error: any) {
        return ApiResponse.error(request, error.message, error.statusCode);
    }
}