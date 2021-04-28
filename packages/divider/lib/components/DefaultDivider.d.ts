import React, { ReactElement } from 'react';
import { DividerPluginTheme } from '../theme';
export interface DefaultDividerProps extends React.HTMLAttributes<HTMLHRElement> {
    className?: string;
    theme?: DividerPluginTheme;
    block: unknown;
    blockProps: unknown;
    customStyleMap: unknown;
    customStyleFn: unknown;
    decorator: unknown;
    forceSelection: unknown;
    offsetKey: unknown;
    selection: unknown;
    tree: unknown;
    contentState: unknown;
    blockStyleFn: unknown;
    preventScroll: unknown;
}
export default function Divider({ block, // eslint-disable-line @typescript-eslint/no-unused-vars
className, theme, ...otherProps }: DefaultDividerProps): ReactElement;
