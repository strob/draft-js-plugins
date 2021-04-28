import { ContentState, EditorState } from 'draft-js';
import { ReactElement, ReactNode } from 'react';
import { HashtagPluginTheme } from './theme';
export interface HashtagProps {
    theme?: HashtagPluginTheme;
    className?: string;
    children?: ReactNode;
    decoratedText?: string;
    dir?: null;
    entityKey?: string | null;
    offsetKey?: string;
    contentState?: ContentState;
    blockKey?: string;
    start?: number;
    end?: number;
    setEditorState?(editorState: EditorState): void;
    getEditorState?(): EditorState;
}
export default function Hashtag(props: HashtagProps): ReactElement;
