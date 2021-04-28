import { DraftHandleValue, SelectionState } from 'draft-js';
import { PluginFunctions } from '@draft-js-plugins/editor';
import { DndUploadPluginConfig } from '.';
export default function onDropFile(config: DndUploadPluginConfig): (selection: SelectionState, files: Blob[], { getEditorState, setEditorState }: PluginFunctions) => DraftHandleValue;
