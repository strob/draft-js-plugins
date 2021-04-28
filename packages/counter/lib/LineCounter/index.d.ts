import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { CounterPluginTheme } from '../theme';
import { CounterPluginStore } from '..';
export interface LineCounterPubParams {
    limit?: number;
    className?: string;
}
interface LineCounterParams extends LineCounterPubParams {
    store: CounterPluginStore;
    theme?: CounterPluginTheme;
}
declare const LineCounter: {
    ({ store, limit, theme, className, }: LineCounterParams): ReactElement;
    propTypes: {
        theme: PropTypes.Requireable<any>;
        store: PropTypes.Requireable<any>;
        className: PropTypes.Requireable<any>;
        limit: PropTypes.Requireable<number>;
    };
};
export default LineCounter;
