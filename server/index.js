/**
 * Created by chenlizan on 2017/7/22.
 */

if (process.env.NODE_ENV === 'development') {

    require("babel-polyfill");

    require('babel-register')({
        presets: ['es2015', 'react', 'stage-0']
    });

    require('asset-require-hook')({
        extensions: ['jpg', 'png', 'gif'],
        limit: 8192
    })

    require('./app.dev');
}
else {
    module.exports = require('../webpack.prod.config');
}
