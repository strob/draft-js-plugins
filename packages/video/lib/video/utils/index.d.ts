export declare function isYoutube(url: string): boolean;
export declare function isVimeo(url: string): boolean;
export declare type SourceType = 'youtube' | 'vimeo';
export interface SourceResult {
    srcID: string;
    srcType: SourceType;
    url: string;
}
export declare function getYoutubeSrc(url: string): SourceResult;
export declare function getVimeoSrc(url: string): SourceResult;
