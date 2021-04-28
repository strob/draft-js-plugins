import { ContentBlock } from 'draft-js';
import { PluginFunctions } from '@draft-js-plugins/editor';
import { ComponentType } from 'react';
import { StickerPubProps } from './Sticker';
declare const _default: (sticker: ComponentType<StickerPubProps>) => (contentBlock: ContentBlock, { getEditorState, setEditorState }: PluginFunctions) => unknown;
export default _default;
