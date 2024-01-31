import { LokaliseRelatedValues } from "@/types/monday";
import { DownloadBundle } from "@/types/translations";
import { LokaliseApi, PaginatedResult } from "@lokalise/node-api";
import JSZip from "jszip";

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

    async downloadBundle(projectId: string): Promise<any> {
        const bundle: DownloadBundle = await this.getTranslationFiles(projectId);
        const response: any = (await fetch(bundle.bundle_url)).arrayBuffer();
        return response;
    }

    async getTranslationFileContent(
        projectId: string,
        mondayId: number,
        language: string
    ): Promise<JSON> {
        const bundle = await this.downloadBundle(projectId);
        const zip = await JSZip.loadAsync(bundle);

        const fileName = this.parseFileNames(zip.files, mondayId, language);
        
        if (!fileName) {
            return JSON.parse("{}");
        }

        const fileContents = await zip.file(fileName)?.async("string");
        return JSON.parse(fileContents || "{}");
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
}

export default new TranslationService(process.env.LOKALISE_API_TOKEN || "");
