/**
 * Created by chenlizan on 2017/7/16.
 */

import {Router} from 'express';

const router = Router();

import {Database} from 'sqlite3';

const db = new Database('chain.sqlite3', (err) => {
    if (err) console.log(err);
});

require.ensure([], require => {
    require('./testEnsure')
}, 'testEnsure');

export default () => {

    router.route('/test').get(function (req, res, next) {
        res.send('hello test');
    });

    return router;
}
