export interface FileResult {
    lastModifiedDate: string | undefined;
    lastModified: number;
    name: string;
    size: number;
    type: string;
    src: string | ArrayBuffer | null;
}
export declare function readFile(file: File): Promise<FileResult>;
export declare function readFiles(files: File[]): Promise<FileResult[]>;
