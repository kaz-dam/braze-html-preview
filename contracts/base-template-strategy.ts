export abstract class BaseTemplateStrategy {
    abstract getFileContent(filePath: string): Promise<string>;
}