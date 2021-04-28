import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { CounterPluginTheme } from '../theme';
import { CounterPluginStore } from '..';
export interface CustomCounterPubProps {
    limit?: number;
    countFunction(text: string): number;
    className?: string;
}
interface CustomCounterProps extends CustomCounterPubProps {
    store: CounterPluginStore;
    theme?: CounterPluginTheme;
}
declare const CustomCounter: {
    ({ store, limit, countFunction, theme, className, }: CustomCounterProps): ReactElement;
    propTypes: {
        theme: PropTypes.Requireable<any>;
        store: PropTypes.Requireable<any>;
        className: PropTypes.Requireable<any>;
        limit: PropTypes.Requireable<number>;
        countFunction: PropTypes.Validator<(...args: any[]) => any>;
    };
};
export default CustomCounter;
