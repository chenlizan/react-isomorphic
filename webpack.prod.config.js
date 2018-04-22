/**
 * Created by chenlizan on 2017/7/1.
 */

'use strict';

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const clientConfig = {
    entry: {
        client: path.resolve(__dirname, 'client/index'),
        vendor: ['react', 'react-dom', 'react-redux', 'react-router', 'redux', 'redux-actions']
    },
    output: {
        path: path.resolve(__dirname, 'dist/public'),
        chunkFilename: 'chunk.[chunkhash:5].js',
        filename: '[name].js',
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
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                modules: true,
                                localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            }
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        }
                    ]
                })
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity,
        }),
        new HtmlWebpackPlugin({
            filename: '../views/index.html',
            template: './server/views/tpl/index.html'
        }),
        new ExtractTextPlugin('[name].[contenthash:5].css'),
        new webpack.optimize.UglifyJsPlugin({
            uglifyOptions: {
                ie8: true,
                ecma: 8,
                compress: {
                    warnings: false,
                    comparisons: false
                },
                output: {
                    ascii_only: true,
                    comments: false
                },
                warnings: false
            }
        }),
        new CleanWebpackPlugin(['public', 'views']),
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

const serverConfig = {
    entry: {
        server: ['babel-polyfill', path.resolve(__dirname, 'server/app.prod.js')]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: 'chunk.[chunkhash:5].js',
        filename: '[name].js',
        publicPath: '/'
    },
    externals: {
        sqlite3: 'sqlite3',
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
                use: [
                    {
                        loader: 'css-loader/locals',
                        options: {
                            minimize: true,
                            modules: true,
                            localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            uglifyOptions: {
                ecma: 8,
                compress: {
                    warnings: false,
                    comparisons: false
                },
                output: {
                    ascii_only: true,
                    comments: false
                },
                warnings: false
            }
        }),
        new CleanWebpackPlugin('dist/*.js'),
        new ProgressBarPlugin()
    ],
    node: {
        __filename: true,
        __dirname: true
    },
    target: 'node'
};

module.exports = [clientConfig, serverConfig];
