/**
 * Created by chenlizan on 2017/7/14.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {fromJS} from 'immutable';
import {routes} from '../common/routes/index'
import {configureStore} from '../common/store';

import '../common/stylesheets/index.css';

const store = configureStore(fromJS(window.__PRELOAD_STATE__));

ReactDOM.render(
    <Provider store={store}>
        {routes}
    </Provider>,
    document.getElementById('root')
);
