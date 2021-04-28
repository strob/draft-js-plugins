import { ComponentType } from 'react';
import { EditorPlugin } from '@draft-js-plugins/editor';
import { ComponentProps } from './Link/Link';
import { LinkifyPluginTheme } from './theme';
export { extractLinks } from './utils/extractLinks';
export interface LinkifyPluginConfig {
    component?: ComponentType<ComponentProps>;
    theme?: LinkifyPluginTheme;
    target?: string;
    rel?: string;
}
declare const _default: (config?: LinkifyPluginConfig) => EditorPlugin;
export default _default;
