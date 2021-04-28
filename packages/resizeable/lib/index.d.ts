import { EditorState } from 'draft-js';
import { EditorPlugin, EditorRef } from '@draft-js-plugins/editor';
import createDecorator from './createDecorator';
declare type ResizeableEditorPlugin = EditorPlugin & {
    decorator: ReturnType<typeof createDecorator>;
};
export declare type ScaleType = 'auto' | 'relative' | 'absolute';
export interface BlockProps {
    setResizeData(value: {
        width: number;
        height: number;
    }): void;
    resizeData: {
        width: number;
        height: number;
    };
}
export interface ResizeablePluginConfig {
    blockProps?: BlockProps;
    horizontal?: ScaleType;
    vertical?: ScaleType;
    initialWidth?: string;
    initialHeight?: string;
}
export interface ResizeablePluginStore {
    getEditorRef?(): EditorRef;
    getReadOnly?(): boolean;
    getEditorState?(): EditorState;
    setEditorState?(state: EditorState): void;
}
declare const _default: (config: ResizeablePluginConfig) => ResizeableEditorPlugin;
export default _default;
