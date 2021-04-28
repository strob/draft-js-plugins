import { EditorState } from 'draft-js';
import { FileResult } from './file';
export declare function getBlocksWhereEntityData(editorState: EditorState, filter: (block: FileResult | null) => boolean): boolean;
