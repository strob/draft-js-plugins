import { ContentBlock } from 'draft-js';
import React, { ComponentType } from 'react';
import { DndPluginStore } from '.';
interface DecoratorParams extends React.HTMLAttributes<HTMLElement> {
    block: ContentBlock;
    ref: React.ForwardedRef<unknown>;
}
declare type WrappedComponentType = ComponentType<DecoratorParams> & {
    WrappedComponent?: ComponentType<DecoratorParams>;
};
declare const _default: ({ store }: {
    store: DndPluginStore;
}) => (WrappedComponent: WrappedComponentType) => WrappedComponentType;
export default _default;
