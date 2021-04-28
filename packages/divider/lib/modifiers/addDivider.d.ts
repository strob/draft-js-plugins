import { EditorState } from 'draft-js';
export default function addDivider(entityType: string): (editorState: EditorState, data?: Record<string, unknown> | undefined) => EditorState;
