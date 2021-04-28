import { Component, MouseEvent, ReactElement, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { UndoPluginTheme } from '../theme';
import { UndoPuginStore, UndoRedoButtonProps } from '..';
interface RedoButtonProps extends UndoRedoButtonProps {
    theme: UndoPluginTheme;
    store: UndoPuginStore;
    children: ReactNode;
}
export default class RedoButton extends Component<RedoButtonProps> {
    static propTypes: {
        children: PropTypes.Validator<string | number | boolean | {} | PropTypes.ReactElementLike | PropTypes.ReactNodeArray>;
        theme: PropTypes.Requireable<any>;
    };
    onClick: (event: MouseEvent) => void;
    render(): ReactElement;
}
export {};
