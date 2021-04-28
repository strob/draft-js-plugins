interface HashtagIndice {
    hashtag: string;
    indices: [number, number];
}
export declare function extractHashtagsWithIndices(text: string): HashtagIndice[];
export {};
