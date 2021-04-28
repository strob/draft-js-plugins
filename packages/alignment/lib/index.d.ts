import { ComponentType } from 'react';
import { EditorState } from 'draft-js';
import { EditorPlugin } from '@draft-js-plugins/editor';
import { Store } from '@draft-js-plugins/utils';
import createDecorator from './createDecorator';
import AlignmentTool from './AlignmentTool';
import { AlignmentPluginTheme } from './theme';
interface AlignmentPluginConfig {
    theme?: AlignmentPluginTheme;
}
interface StoreItemMap {
    isVisible?: boolean;
    getReadOnly?(): boolean;
    getEditorState?(): EditorState;
    setEditorState?(editorState: EditorState): void;
    visibleBlock?: null | string;
    setAlignment?(val: {
        alignment: string;
    }): void;
    alignment?: string;
    boundingRect?: DOMRect;
}
export declare type AlignmentPluginStore = Store<StoreItemMap>;
declare const _default: (config?: AlignmentPluginConfig) => EditorPlugin & {
    decorator: ReturnType<typeof createDecorator>;
    AlignmentTool: ComponentType;
};
export default _default;
