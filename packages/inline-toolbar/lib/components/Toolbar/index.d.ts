import React, { ComponentType, CSSProperties, FC, ReactElement } from 'react';
import { EditorState } from 'draft-js';
import { DraftJsButtonTheme } from '@draft-js-plugins/buttons';
import { InlineToolbarPluginStore } from '../../';
import { InlineToolbarPluginTheme } from '../../theme';
interface OverrideContentProps {
    getEditorState: () => EditorState;
    setEditorState: (editorState: EditorState) => void;
    onOverrideContent: (content: ComponentType<unknown> | undefined) => void;
}
export interface ToolbarChildrenProps {
    theme: DraftJsButtonTheme;
    getEditorState: () => EditorState;
    setEditorState: (editorState: EditorState) => void;
    onOverrideContent: (content: ComponentType<OverrideContentProps> | undefined) => void;
}
interface ToolbarProps {
    store: InlineToolbarPluginStore;
    children?: FC<ToolbarChildrenProps>;
    isVisible?: boolean;
    position?: {
        top: number;
        left: number;
    };
    overrideContent?: ComponentType<ToolbarChildrenProps>;
    theme: InlineToolbarPluginTheme;
}
export default class Toolbar extends React.Component<ToolbarProps> {
    static defaultProps: {
        children: (externalProps: ToolbarChildrenProps) => ReactElement;
    };
    state: ToolbarProps;
    toolbar: HTMLDivElement | null;
    UNSAFE_componentWillMount(): void;
    componentWillUnmount(): void;
    /**
     * This can be called by a child in order to render custom content instead
     * of the children prop. It's the responsibility of the callee to call
     * this function again with `undefined` in order to reset `overrideContent`.
     * @param {Component} overrideContent
     */
    onOverrideContent: (overrideContent: ComponentType<OverrideContentProps> | undefined) => void;
    onSelectionChanged: () => void;
    getStyle(): CSSProperties;
    render(): ReactElement;
}
export {};
