import { ComponentType } from 'react';
import { EditorPlugin } from '@draft-js-plugins/editor';
import addVideo from './video/modifiers/addVideo';
import { DefaultVideoComponentProps } from './video/components/DefaultVideoComponent';
import * as types from './video/constants';
import { VideoPluginTheme } from './theme';
export type { VideoPluginTheme };
export interface VideoPluginConfig {
    theme?: VideoPluginTheme;
    videoComponent?: ComponentType<DefaultVideoComponentProps>;
    decorator?(component: ComponentType<DefaultVideoComponentProps>): ComponentType<DefaultVideoComponentProps>;
}
export interface VideoPlugin extends EditorPlugin {
    addVideo: typeof addVideo;
    types: typeof types;
}
export default function videoPlugin(config?: VideoPluginConfig): VideoPlugin;
