import { DraftJsButtonTheme } from '@draft-js-plugins/buttons';
export interface AlignmentPluginTheme {
    buttonStyles: DraftJsButtonTheme;
    alignmentToolStyles: {
        alignmentTool: string;
    };
}
export declare const defaultTheme: AlignmentPluginTheme;
