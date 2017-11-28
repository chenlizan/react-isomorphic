/**
 * Created by chenlizan on 2017/7/4.
 */

import React from 'react';
import {renderToString} from 'react-dom/server';
import {Provider} from 'react-redux';
import {match, RouterContext} from 'react-router';
import {fromJS} from 'immutable';
import {routes} from '../../common/routes/index';
import {configureStore} from '../../common/store/index';
import Login from '../../common/reducers/Login';

const index = (process.env.NODE_ENV === 'development') ? 'dev/index' : 'prod/index';

const initState = fromJS({
    Login: Login.initState
});

const store = configureStore(initState);

const reactRender = (req, res, next) => {
    let _renderProps;

    match({routes, location: req.originalUrl}, (error, redirectLocation, renderProps) => {
        _renderProps = renderProps;

        if (_renderProps) {
            res.render('index', {
                root: renderToString(
                    <Provider store={store}>
                        <RouterContext {..._renderProps}/>
                    </Provider>
                ),
                state: store.getState()
            });
        } else {
            next();
        }
    });

}

export default reactRender;