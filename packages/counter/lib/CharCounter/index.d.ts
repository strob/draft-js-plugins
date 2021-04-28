import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { CounterPluginTheme } from '../theme';
import { CounterPluginStore } from '..';
export interface CharCounterPubProps {
    className?: string;
    limit?: number;
}
interface CharCounterProps extends CharCounterPubProps {
    theme?: CounterPluginTheme;
    store: CounterPluginStore;
}
declare const CharCounter: {
    ({ theme, className, store, limit, }: CharCounterProps): ReactElement;
    propTypes: {
        theme: PropTypes.Requireable<any>;
        className: PropTypes.Requireable<any>;
        store: PropTypes.Requireable<any>;
        limit: PropTypes.Requireable<any>;
    };
};
export default CharCounter;
