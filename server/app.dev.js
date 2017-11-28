/**
 * Created by chenlizan on 2017/6/30.
 */

import path from 'path'
import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.dev.config';
import reactRender from './middlewares/reactRender';

import routes from './routes/index';

const App = () => {
    const app = express();

    // view engine setup
    app.engine('html', require('ejs').__express);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'html');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(express.static(path.join(__dirname, 'public')));

    const compiler = webpack(webpackConfig);

    app.use(reactRender);

    app.use(routes());

    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath
    }));
    app.use(webpackHotMiddleware(compiler, {
        log: false,
        path: "/__what",
        heartbeat: 2000
    }));

    return app;
};

const createApp = () => {
    const app = App();
    const port = process.env.PORT || 3000;
    app.listen(port, function () {
        console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
    });
    return app;
};

createApp();

