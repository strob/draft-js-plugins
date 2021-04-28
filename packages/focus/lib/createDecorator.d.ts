import { ComponentType, MouseEvent, Ref } from 'react';
import { ContentBlock } from 'draft-js';
import { FocusPluginTheme } from './theme';
import { BlockKeyStore } from './utils/createBlockKeyStore';
interface DecoratorProps {
    theme: FocusPluginTheme;
    blockKeyStore: BlockKeyStore;
}
interface BlockFocusDecoratorProps {
    blockProps: {
        isFocused: boolean;
        setFocusToBlock(): void;
    };
    className: string;
    block: ContentBlock;
    onClick(event: MouseEvent): void;
    ref: Ref<unknown>;
}
declare type WrappedComponentType = ComponentType<BlockFocusDecoratorProps> & {
    WrappedComponent?: ComponentType<BlockFocusDecoratorProps>;
};
declare const _default: ({ theme, blockKeyStore }: DecoratorProps) => (WrappedComponent: WrappedComponentType) => ComponentType<BlockFocusDecoratorProps>;
export default _default;
