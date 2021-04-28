import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { ContentBlock, ContentState, SelectionState } from 'draft-js';
import { CSSProperties } from 'linaria';
import { VideoPluginTheme } from '../../theme';
export interface DefaultVideoComponentProps {
    blockProps: {
        src: string;
    };
    className?: string;
    style?: CSSProperties;
    theme: VideoPluginTheme;
    block: ContentBlock;
    customStyleMap: unknown;
    customStyleFn: unknown;
    decorator: unknown;
    forceSelection: unknown;
    offsetKey: string;
    selection: SelectionState;
    tree: unknown;
    contentState: ContentState;
    blockStyleFn: unknown;
}
declare const DefaultVideoComponent: {
    ({ blockProps, className, style, theme, ...otherProps }: DefaultVideoComponentProps): ReactElement;
    propTypes: {
        blockProps: PropTypes.Validator<object>;
        className: PropTypes.Requireable<string>;
        style: PropTypes.Requireable<object>;
        theme: PropTypes.Validator<object>;
    };
};
export default DefaultVideoComponent;
