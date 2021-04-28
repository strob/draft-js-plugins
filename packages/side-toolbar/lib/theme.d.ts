import { DraftJsButtonTheme } from '@draft-js-plugins/buttons';
export interface SideToolbarPluginTheme {
    buttonStyles?: DraftJsButtonTheme;
    blockTypeSelectStyles?: {
        blockType?: string;
        spacer?: string;
        popup?: string;
    };
    toolbarStyles?: {
        wrapper?: string;
    };
}
export declare const defaultTheme: SideToolbarPluginTheme;
