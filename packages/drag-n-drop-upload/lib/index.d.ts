import { EditorState } from 'draft-js';
import { EditorPlugin } from '@draft-js-plugins/editor';
export { readFiles, readFile } from './utils/file';
export interface DndUploadPluginConfig {
    handleUpload?(): void;
    addImage?(editorState: EditorState, placeholderSrc: string | ArrayBuffer | null): EditorState;
}
declare const createDndFileUploadPlugin: (config?: DndUploadPluginConfig) => EditorPlugin;
export default createDndFileUploadPlugin;
