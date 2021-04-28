import { ContentBlock } from 'draft-js';
declare const linkStrategy: (contentBlock: ContentBlock, callback: (start: number, end: number) => void) => void;
export default linkStrategy;
