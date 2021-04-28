import { ComponentType, CSSProperties, LegacyRef } from 'react';
import { ResizeablePluginConfig, ResizeablePluginStore, ScaleType, BlockProps } from '.';
interface DecoratorProps {
    config: ResizeablePluginConfig;
    store: ResizeablePluginStore;
}
export interface WrappedComponentProps {
    blockProps: BlockProps;
    hoverPosition: Record<string, boolean>;
    clicked: boolean;
    width: number;
    height: number;
    style?: CSSProperties;
    ref?: LegacyRef<HTMLElement>;
}
interface BlockResizeableDecoratorProps extends WrappedComponentProps {
    vertical: ScaleType | boolean;
    horizontal: ScaleType;
    isResizable: boolean;
    resizeSteps: number;
    initialWidth: number;
    initialHeight: number;
}
declare type WrappedComponentType = ComponentType<WrappedComponentProps> & {
    WrappedComponent?: ComponentType<WrappedComponentProps>;
};
declare const _default: ({ config, store }: DecoratorProps) => (WrappedComponent: WrappedComponentType) => ComponentType<BlockResizeableDecoratorProps>;
export default _default;
