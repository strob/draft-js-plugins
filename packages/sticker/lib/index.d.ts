import { ComponentType, ReactNode } from 'react';
import { EditorPlugin } from '@draft-js-plugins/editor';
import addSticker from './modifiers/addSticker';
import removeSticker from './modifiers/removeSticker';
import StickerSelect, { StickerSelectPubParams } from './StickerSelect';
import { StickerPluginTheme } from './theme';
export declare type ImmutableStickerPluginItem = Immutable.Map<string, Immutable.Map<string, string>>;
export declare type ImmutableDataStickerPluginItem = Immutable.Map<string, ImmutableStickerPluginItem>;
export interface StickerPluginConfig {
    attachRemoveButton?: boolean;
    theme?: StickerPluginTheme;
    stickers: ImmutableDataStickerPluginItem;
    selectButtonContent?: ReactNode;
}
declare const _default: (config: StickerPluginConfig) => EditorPlugin & {
    add: typeof addSticker;
    remove: typeof removeSticker;
    StickerSelect: ComponentType<StickerSelectPubParams>;
};
export default _default;
