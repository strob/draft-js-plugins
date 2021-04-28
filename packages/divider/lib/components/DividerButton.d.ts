import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';
export interface DividerButtonTheme {
    buttonWrapper: string;
    button: string;
    active: string;
}
export interface DividerButtonPubProps {
    theme?: DividerButtonTheme;
    getEditorState(): EditorState;
    setEditorState(state: EditorState): void;
    blockType: string;
}
export interface DividerButtonProps extends DividerButtonPubProps {
    addDivider(editorState: EditorState, data?: Record<string, unknown>): EditorState;
}
declare const DividerButton: {
    (props: DividerButtonProps): ReactElement;
    propTypes: {
        theme: PropTypes.Requireable<object>;
        getEditorState: PropTypes.Validator<(...args: any[]) => any>;
        setEditorState: PropTypes.Validator<(...args: any[]) => any>;
        addDivider: PropTypes.Validator<(...args: any[]) => any>;
    };
};
export default DividerButton;
