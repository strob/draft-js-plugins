import { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { CounterPluginTheme } from '../theme';
import { CounterPluginStore } from '..';
export interface WordCounterPubParams {
    className?: string;
    limit?: number;
}
interface WordCounterParams extends WordCounterPubParams {
    store: CounterPluginStore;
    theme?: CounterPluginTheme;
}
declare const WordCounter: {
    ({ store, limit, theme, className, }: WordCounterParams): ReactElement;
    propTypes: {
        theme: PropTypes.Requireable<any>;
        limit: PropTypes.Requireable<number>;
    };
};
export default WordCounter;
