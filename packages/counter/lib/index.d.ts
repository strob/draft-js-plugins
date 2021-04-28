import { ComponentType } from 'react';
import { EditorState } from 'draft-js';
import { EditorPlugin } from '@draft-js-plugins/editor';
import { CharCounterPubProps } from './CharCounter';
import { WordCounterPubParams } from './WordCounter';
import { LineCounterPubParams } from './LineCounter';
import { CustomCounterPubProps } from './CustomCounter';
import { CounterPluginTheme } from './theme';
export interface CounterPluginStore {
    getEditorState?(): EditorState;
    setEditorState?(state: EditorState): void;
}
export interface CounterPluginConfig {
    theme?: CounterPluginTheme;
}
export declare type CounterPlugin = EditorPlugin & {
    CharCounter: ComponentType<CharCounterPubProps>;
    WordCounter: ComponentType<WordCounterPubParams>;
    LineCounter: ComponentType<LineCounterPubParams>;
    CustomCounter: ComponentType<CustomCounterPubProps>;
};
declare const _default: (config?: CounterPluginConfig) => CounterPlugin;
export default _default;
