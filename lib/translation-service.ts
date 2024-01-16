import { DownloadBundle } from "@/types/translations";
import { LokaliseApi, PaginatedResult } from "@lokalise/node-api";
import axios, { AxiosResponse } from "axios";
import JSZip, { file } from "jszip";

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

    async getTranslationFileList(): Promise<PaginatedResult> {
        return this.lokaliseApi.files().list({
            project_id: this.projectId,
        });
    }

    async getTranslationFiles(): Promise<DownloadBundle> {
        return this.lokaliseApi.files().download(this.projectId, {
            format: "json",
            original_filenames: true,
        });
    }

    async downloadBundle(): Promise<any> {
        const bundle: DownloadBundle = await this.getTranslationFiles();
        const response: AxiosResponse = await axios.get(bundle.bundle_url, { responseType: "arraybuffer" });
        return response.data;
    }

    async getTranslationFileContent(): Promise<JSON> {
        const bundle = await this.downloadBundle();
        const zip = await JSZip.loadAsync(bundle);

        // TODO: parse file name using monday id
        const fileName = "some_file.json";
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
}

export default new TranslationService(process.env.LOKALISE_API_TOKEN || "");
