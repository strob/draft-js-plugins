import { Component, ReactElement, ReactNode } from 'react';
import { EditorState } from 'draft-js';
import { StickerPluginTheme } from '../theme';
import { ImmutableDataStickerPluginItem } from '..';
export interface StickerSelectPubParams {
    editor: {
        onChange(state: EditorState): void;
        state: {
            editorState: EditorState;
        };
    };
}
interface StickerSelectParams extends StickerSelectPubParams {
    theme?: StickerPluginTheme;
    stickers: ImmutableDataStickerPluginItem;
    selectButtonContent: ReactNode;
}
/**
 * Sticker Selector Component
 */
export default class StickerSelect extends Component<StickerSelectParams> {
    state: {
        open: boolean;
    };
    preventNextClose?: boolean;
    componentDidMount(): void;
    componentWillUnmount(): void;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    openPopover: () => void;
    closePopover: () => void;
    add: (id: string) => void;
    render(): ReactElement;
}
export {};
