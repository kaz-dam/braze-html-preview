import { TranslationObject } from "@/types/translations";
import { Key, LokaliseApi, PaginatedResult, Translation } from "@lokalise/node-api";
import { randomUUID } from 'crypto';

class TranslationService {
    private lokaliseApi: LokaliseApi;

    constructor(apiKey: string) {
        this.lokaliseApi = new LokaliseApi({ apiKey });
    }

    async getTaskTranslations(
        projectId: string,
        taskId: number
    ): Promise<PaginatedResult<Translation>> {
        return this.lokaliseApi.translations().list({
            project_id: projectId,
            filter_active_task_id: taskId,
        });
    }

    async getKeys(
        projectId: string,
        keyIds: number[]
    ): Promise<PaginatedResult<Key>> {
        return this.lokaliseApi.keys().list({
            project_id: projectId,
            filter_key_ids: keyIds.join(",")
        });
    }

    async getTranslationFileContent(
        projectId: string,
        taskId: number
    ): Promise<TranslationObject> {
        const taskTranslations = await this.getTaskTranslations(projectId, taskId);
        const keyIds = taskTranslations.items.map((translation: Translation) => translation.key_id);
        const taskKeys = await this.getKeys(projectId, keyIds);

        return this.mapKeyNamesToTranslations(taskTranslations.items, taskKeys.items);
    }

    parseProjectIdFromUrl(projectUrl: string): string {
        const urlParts = projectUrl.split("/");
        const projectId = urlParts.at(urlParts.length - 2) || "";

        return projectId;
    }

    parseTaskIdFromUrl(taskUrl: string): number {
        const taskUrlObject = new URL(taskUrl);
        const taskId: number = Number(taskUrlObject.searchParams.get("filter")?.split("_")[1]);

        return taskId;
    }

    mapKeyNamesToTranslations(
        taskTranslations: Translation[],
        taskKeys: Key[]
    ): TranslationObject {
        const translations: TranslationObject = {};

        taskKeys.forEach((key: Key) => {
            const keyName: string = (
                key.key_name.web ||
                key.key_name.ios ||
                key.key_name.android ||
                key.key_name.other
            ) ?? randomUUID();

            translations[keyName] = taskTranslations.find((translation: Translation) => {
                return translation.key_id === key.key_id;
            })?.translation || "";
        });

        return translations;
    }
}

export default new TranslationService(process.env.LOKALISE_API_TOKEN || "");
