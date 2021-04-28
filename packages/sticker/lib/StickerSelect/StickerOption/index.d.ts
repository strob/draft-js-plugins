import { Component, ReactElement } from 'react';
import { StickerPluginTheme } from '../../theme';
interface StickerOptionProps {
    id: string;
    url: string;
    theme?: StickerPluginTheme;
    onClick(id: string): void;
}
/**
 * Showcases a sticker one can then pick to add to the editor
 */
export default class StickerOption extends Component<StickerOptionProps> {
    onClick: () => void;
    render(): ReactElement;
}
export {};
