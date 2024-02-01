import { TranslationRouteResponse } from './../types/translations';
import { LokaliseRelatedValues } from "@/types/monday";
import { DownloadBundle } from "@/types/translations";
import { Key, LokaliseApi, PaginatedResult, Translation, TranslationData } from "@lokalise/node-api";
import { randomUUID } from 'crypto';

class TranslationService {
    private lokaliseApi: LokaliseApi;
    private projectId: string;

    constructor(apiKey: string) {
        this.lokaliseApi = new LokaliseApi({ apiKey });
        this.projectId = "";
    }

    async getProjects(): Promise<PaginatedResult> {
        return await this.lokaliseApi.projects().list();
    }

    async getSingleProject(projectId: string) {
        return await this.lokaliseApi.projects().get(projectId);
    }

    async getTranslationFileList(projectId: string): Promise<PaginatedResult> {
        return this.lokaliseApi.files().list({
            project_id: projectId,
        });
    }

    async getTranslationFiles(projectId: string): Promise<DownloadBundle> {
        return this.lokaliseApi.files().download(projectId, {
            format: "json",
            original_filenames: true,
        });
    }

    async getTaskTranslations(projectId: string, taskId: number): Promise<PaginatedResult<Translation>> {
        return this.lokaliseApi.translations().list({
            project_id: projectId,
            filter_active_task_id: taskId,
        });
    }

    async getKeys(projectId: string, keyIds: number[]): Promise<PaginatedResult<Key>> {
        return this.lokaliseApi.keys().list({
            project_id: projectId,
            filter_key_ids: keyIds.join(",")
        });
    }

    async downloadBundle(projectId: string): Promise<any> {
        const bundle: DownloadBundle = await this.getTranslationFiles(projectId);
        const response: any = (await fetch(bundle.bundle_url)).arrayBuffer();
        return response;
    }

    async getTranslationFileContent(
        projectId: string,
        taskId: number,
        mondayId: number,
        language: string
    ): Promise<any> {
        const taskTranslations = await this.getTaskTranslations(projectId, taskId);
        const keyIds = taskTranslations.items.map((translation: any) => translation.key_id);
        const taskKeys = await this.getKeys(projectId, keyIds);

        return this.mapKeyNamesToTranslations(taskTranslations.items, taskKeys.items);
    }

    setProjectId(projectId: string): void {
        this.projectId = projectId;
    }

    getProjectId(): string {
        return this.projectId;
    }

    parseProjectIdFromUrl(projectUrl: string): any {
        let projectId: any = projectUrl.split("/");
        projectId = projectId.at(projectId.length - 2);

        return projectId;
    }

    parseTaskIdFromUrl(taskUrl: string): number {
        const taskUrlObject = new URL(taskUrl);
        const taskId: number = Number(taskUrlObject.searchParams.get("filter")?.split("_")[1]);

        return taskId;
    }

    parseFileNames(
        files: any,
        mondayId: number,
        language: string
    ): string | undefined {
        const keys = Object.keys(files);

        return keys.find((item: string) => {
            // return item.startsWith(mondayId.toString())
            return (
                item.includes(mondayId.toString()) &&
                item.includes(language)
            );
        });
    }

    mapKeyNamesToTranslations(taskTranslations: Translation[], taskKeys: Key[]) {
        const translations: any = {};

        taskKeys.forEach((key: Key) => {
            const keyName = (
                key.key_name.web ||
                key.key_name.ios ||
                key.key_name.android ||
                key.key_name.other
            ) ?? randomUUID();

            translations[keyName] = taskTranslations.find((translation: Translation) => {
                return translation.key_id === key.key_id;
            })?.translation;
        });

        return translations;
    }
}

export default new TranslationService(process.env.LOKALISE_API_TOKEN || "");
