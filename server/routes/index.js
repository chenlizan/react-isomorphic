/**
 * Created by chenlizan on 2017/7/16.
 */

import {Router} from 'express';

const router = Router();

export default () => {

    router.route('/test').get(function (req, res, next) {
        res.send('hello test');
    });

    return router;
}