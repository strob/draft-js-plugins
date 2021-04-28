import { ContentBlock } from 'draft-js';
import { ComponentType, CSSProperties } from 'react';
import { AlignmentPluginStore } from '.';
interface BlockAlignmentDecoratorParams {
    blockProps: {
        isFocused: boolean;
        isCollapsedSelection: boolean;
        alignment: string;
        setAlignment(val: {
            alignment: string;
        }): void;
    };
    style?: CSSProperties;
    block: ContentBlock;
}
declare type WrappedComponentType = ComponentType<BlockAlignmentDecoratorParams> & {
    WrappedComponent?: ComponentType<BlockAlignmentDecoratorParams>;
};
declare const _default: ({ store }: {
    store: AlignmentPluginStore;
}) => (WrappedComponent: WrappedComponentType) => ComponentType<BlockAlignmentDecoratorParams>;
export default _default;
