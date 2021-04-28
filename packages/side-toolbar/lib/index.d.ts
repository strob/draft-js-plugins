import { ComponentType, FC } from 'react';
import { EditorState } from 'draft-js';
import { Store } from '@draft-js-plugins/utils';
import { EditorPlugin } from '@draft-js-plugins/editor';
import { SideToolbarChildrenProps } from './components/Toolbar';
import { SideToolbarPluginTheme } from './theme';
export type { SideToolbarPluginTheme };
export declare type SideToolbarPosition = 'left' | 'right';
export interface SideToolbarPluginConfig {
    theme?: SideToolbarPluginTheme;
    position?: SideToolbarPosition;
}
export interface SideToolbarProps {
    children?: FC<SideToolbarChildrenProps>;
}
export declare type SideToolbarPlugin = EditorPlugin & {
    SideToolbar: ComponentType<SideToolbarProps>;
};
interface StoreItemMap {
    isVisible?: boolean;
    getEditorState?(): EditorState;
    setEditorState?(state: EditorState): void;
    editorState?: EditorState;
    getEditorRef?(): {
        refs?: {
            editor: HTMLElement;
        };
        editor: HTMLElement;
    };
}
export declare type SideToolbarPluginStore = Store<StoreItemMap>;
declare const _default: (config?: SideToolbarPluginConfig) => SideToolbarPlugin;
export default _default;
