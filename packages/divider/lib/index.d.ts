import { ComponentType } from 'react';
import { EditorPlugin } from '@draft-js-plugins/editor';
import { DefaultDividerProps } from './components/DefaultDivider';
import { DividerButtonProps, DividerButtonPubProps } from './components/DividerButton';
import addDivider from './modifiers/addDivider';
import { DividerPluginTheme } from './theme';
interface DividerPluginConfig {
    theme?: DividerPluginTheme;
    entityType?: string;
    dividerComponent?: ComponentType<DefaultDividerProps>;
    buttonComponent?: ComponentType<DividerButtonProps>;
    decorator?: unknown;
}
declare const createDividerPlugin: ({ entityType, dividerComponent, buttonComponent, theme, decorator, }?: DividerPluginConfig) => EditorPlugin & {
    DividerButton: ComponentType<DividerButtonPubProps>;
    addDivider: ReturnType<typeof addDivider>;
};
export default createDividerPlugin;
