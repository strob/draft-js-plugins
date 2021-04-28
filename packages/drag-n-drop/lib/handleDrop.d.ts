import { DraftDragType, DraftHandleValue, EditorState, SelectionState } from 'draft-js';
declare const _default: (selection: SelectionState, dataTransfer: {
    data: {
        getData(type: string): string;
    };
}, isInternal: DraftDragType, { getEditorState, setEditorState, }: {
    getEditorState(): EditorState;
    setEditorState(state: EditorState): void;
}) => DraftHandleValue;
export default _default;
