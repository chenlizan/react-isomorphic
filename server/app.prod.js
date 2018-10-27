/**
 * Created by chenlizan on 2017/8/5.
 */

import path from 'path'
import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import logger from 'morgan';
import reactRender from './middlewares/reactRender';
import routes from './routes/index';

const App = () => {
    const app = express();

    // view engine setup
    app.engine('html', require('ejs').__express);
    app.set('views', path.join(__dirname, '../views'));
    app.set('view engine', 'html');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(compression());
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(reactRender);
    app.use(routes());

    return app;
};

const createApp = () => {
    const app = App();
    const port = process.env.PORT || 4000;
    app.listen(port, function () {
        console.info(`==>  ✈  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    });
    return app;
};

createApp();
