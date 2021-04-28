import { ComponentType, ReactElement, ReactNode } from 'react';
import { LinkifyPluginTheme } from '../theme';
export interface ComponentProps {
    children: ReactNode;
    href: string;
    target: string;
    rel: string;
    className: string;
}
export interface LinkProps {
    decoratedText?: string;
    theme?: LinkifyPluginTheme;
    component?: ComponentType<ComponentProps>;
    children: ReactNode;
    target?: string;
    rel?: string;
    className?: string;
    entityKey?: unknown;
    getEditorState?: unknown;
    offsetKey?: unknown;
    setEditorState?: unknown;
    contentState?: unknown;
    blockKey?: unknown;
    dir?: unknown;
    start?: unknown;
    end?: unknown;
}
export default function Link(props: LinkProps): ReactElement;
