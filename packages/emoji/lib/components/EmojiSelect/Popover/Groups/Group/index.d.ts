import { Component, ComponentType, ReactElement } from 'react';
import PropTypes from 'prop-types';
import Entry from '../../Entry';
import { EmojiImageProps, EmojiPluginTheme, EmojiSelectGroup } from '../../../../../index';
import { EmojiStrategy } from '../../../../../utils/createEmojisFromStrategy';
interface GroupProps {
    hasRenderedEmoji?: boolean;
    theme: EmojiPluginTheme;
    group: EmojiSelectGroup;
    emojis: EmojiStrategy;
    checkMouseDown(): boolean;
    onEmojiSelect(emoji: string): void;
    onEmojiMouseDown(entryComponent: Entry, toneSet: string[] | null): void;
    emojiImage: ComponentType<EmojiImageProps>;
    isActive?: boolean;
}
export default class Group extends Component<GroupProps> {
    static propTypes: {
        theme: PropTypes.Validator<object>;
        group: PropTypes.Validator<object>;
        emojis: PropTypes.Validator<object>;
        checkMouseDown: PropTypes.Validator<(...args: any[]) => any>;
        onEmojiSelect: PropTypes.Validator<(...args: any[]) => any>;
        onEmojiMouseDown: PropTypes.Validator<(...args: any[]) => any>;
        isActive: PropTypes.Requireable<boolean>;
    };
    state: {
        hasRenderedEmoji: boolean;
    };
    container?: HTMLElement | null;
    list?: HTMLUListElement | null;
    shouldComponentUpdate: (nextProps: GroupProps) => boolean;
    componentDidUpdate(): void;
    renderCategory: (category: string) => ReactElement[];
    render(): ReactElement;
}
export {};
