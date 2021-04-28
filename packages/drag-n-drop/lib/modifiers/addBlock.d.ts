import { EditorState, SelectionState, ContentState } from 'draft-js';
export default function addBlock(editorState: EditorState, selection: SelectionState, type: string, data: Record<string, unknown>, entityType: string, text?: string): ContentState;
