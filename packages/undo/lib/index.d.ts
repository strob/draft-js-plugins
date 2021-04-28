import { ComponentType, ReactNode } from 'react';
import { EditorState } from 'draft-js';
import { EditorPlugin } from '@draft-js-plugins/editor';
import UndoButton from './UndoButton';
import RedoButton from './RedoButton';
import { UndoPluginTheme } from './theme';
export interface UndoPuginConfig {
    undoContent?: ReactNode;
    redoContent?: ReactNode;
    theme?: UndoPluginTheme;
}
export interface UndoPuginStore {
    getEditorState?(): EditorState;
    setEditorState?(state: EditorState): void;
}
export interface UndoRedoButtonProps {
    className?: string;
}
declare const _default: (config?: UndoPuginConfig) => EditorPlugin & {
    UndoButton: ComponentType<UndoRedoButtonProps>;
    RedoButton: ComponentType<UndoRedoButtonProps>;
};
export default _default;
