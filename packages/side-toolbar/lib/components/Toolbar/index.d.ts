import React, { ReactElement, FC } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { BlockTypeSelectChildProps } from '../BlockTypeSelect';
import { SideToolbarPluginTheme } from '../../theme';
import { SideToolbarPluginStore, SideToolbarPosition } from '../..';
export declare type SideToolbarChildrenProps = BlockTypeSelectChildProps;
interface ToolbarProps {
    children?: FC<SideToolbarChildrenProps>;
    store: SideToolbarPluginStore;
    position: SideToolbarPosition;
    theme: SideToolbarPluginTheme;
}
export default class Toolbar extends React.Component<ToolbarProps> {
    static defaultProps: {
        children: (externalProps: SideToolbarChildrenProps) => ReactElement;
    };
    static propTypes: {
        children: PropTypes.Requireable<(...args: any[]) => any>;
    };
    state: {
        position: {
            transform: string;
        };
    };
    componentDidMount(): void;
    componentWillUnmount(): void;
    onEditorStateChange: (editorState?: EditorState | undefined) => void;
    render(): ReactElement;
}
export {};
