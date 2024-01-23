import { NextRequest } from "next/server";
import { TranslationsRouteParams } from "@/types/translations";
import TranslationController from "@/controllers/translation-controller";

export async function GET(
    request: NextRequest,
    { params }: TranslationsRouteParams
) {
    return TranslationController.getTranslationByProjectId(request, params);
}