/**
 * Created by chenlizan on 2017/7/1.
 */

'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const clientConfig = {
    devtool: 'eval-source-map',
    entry: [
        "babel-polyfill",
        path.resolve(__dirname, 'client/index'),
        'webpack-hot-middleware/client?path=/__what&timeout=2000&overlay=false&reload=true'
    ],
    output: {
        path: path.resolve(__dirname, 'dist/client'),
        chunkFilename: 'chunk.[chunkhash:5].js',
        filename: 'client.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'es2015', 'react', 'stage-0'],
                        plugins: [
                            ['import', {'libraryName': 'antd', 'style': 'css'}]
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            }
                        }
                    ]
                }))
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                }))
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("development")
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin("styles.css"),
        new OpenBrowserPlugin({url: 'http://localhost:3000', browser: 'chrome'}),
        new ProgressBarPlugin()
    ],
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
    },
    target: 'web'
};

module.exports = clientConfig;
