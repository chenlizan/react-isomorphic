/**
 * Created by chenlizan on 2017/6/18.
 */

import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Loadable from 'react-loadable';

const App = Loadable({
    loader: () => import('../App'),
    loading: () => null
});

const Login = Loadable({
    loader: () => import('../containers/Login'),
    loading: () => null
});

export const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Login}/>
            <Route path="login" component={Login}/>
        </Route>
    </Router>
);
