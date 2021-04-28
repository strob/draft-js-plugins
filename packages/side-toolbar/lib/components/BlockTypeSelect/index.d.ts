import { CSSProperties, FC, MouseEvent, ReactElement, Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
import { DraftJsButtonTheme } from '@draft-js-plugins/buttons';
import { SideToolbarPluginTheme } from '../../theme';
export interface BlockTypeSelectChildProps {
    theme: DraftJsButtonTheme;
    getEditorState(): EditorState;
    setEditorState(state: EditorState): void;
}
interface BlockTypeSelectProps {
    style?: CSSProperties;
    theme: SideToolbarPluginTheme;
    getEditorState(): EditorState;
    setEditorState(state: EditorState): void;
    childNodes: FC<BlockTypeSelectChildProps>;
}
export default class BlockTypeSelect extends Component<BlockTypeSelectProps> {
    static propTypes: {
        childNodes: PropTypes.Requireable<(...args: any[]) => any>;
    };
    state: {
        style: {
            transform: string;
        };
    };
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onMouseDown: (clickEvent: MouseEvent) => void;
    render(): ReactElement;
}
export {};
