/**
 * Created by chenlizan on 2017/6/18.
 */

import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from '../App';
import Login from '../containers/Login';

export const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Login}/>
            <Route path="login" component={Login}/>
        </Route>
    </Router>
);
