import { ContentBlock, ContentState } from 'draft-js';
import { Component, MouseEvent, ReactElement } from 'react';
import { ImmutableDataStickerPluginItem } from '..';
import { StickerPluginTheme } from '../theme';
export interface StickerPubProps {
    block: ContentBlock;
    contentState: ContentState;
    blockProps: {
        onRemove(blockKey: string): void;
    };
}
interface StickerProps extends StickerPubProps {
    stickers: ImmutableDataStickerPluginItem;
    attachRemoveButton?: boolean;
    theme?: StickerPluginTheme;
}
export default class Sticker extends Component<StickerProps> {
    remove: (event: MouseEvent) => void;
    render(): ReactElement;
}
export {};
