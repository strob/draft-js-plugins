import { EditorPlugin } from '@draft-js-plugins/editor';
import createDecorator from './createDecorator';
import { FocusPluginTheme } from './theme';
export interface FocusEditorPluginConfig {
    theme?: FocusPluginTheme;
}
declare type FocusEditorPlugin = EditorPlugin & {
    decorator: ReturnType<typeof createDecorator>;
};
declare const _default: (config?: FocusEditorPluginConfig) => FocusEditorPlugin;
export default _default;
