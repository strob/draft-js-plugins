import { EditorPlugin } from '@draft-js-plugins/editor';
import createDecorator from './createDecorator';
declare type DndEditorPlugin = EditorPlugin & {
    decorator: ReturnType<typeof createDecorator>;
};
export interface DndPluginStore {
    getReadOnly?(): boolean;
}
export default function createBlockDndPlugin(): DndEditorPlugin;
export {};
