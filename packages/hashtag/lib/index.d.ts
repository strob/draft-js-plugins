import { ComponentType } from 'react';
import { EditorPlugin } from '@draft-js-plugins/editor';
import { HashtagProps } from './Hashtag';
import { HashtagPluginTheme } from './theme';
export { extractHashtagsWithIndices } from './utils/extractHashtags';
export type { HashtagProps };
export interface HashtagPluginConfig {
    theme?: HashtagPluginTheme;
    hashtagComponent?: ComponentType<HashtagProps>;
}
declare const _default: (config?: HashtagPluginConfig) => EditorPlugin;
export default _default;
