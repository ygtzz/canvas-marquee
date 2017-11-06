var webpack = require('webpack');
var path = require('path');
var libraryName = 'canvasMarquee';

var config = {
    entry: __dirname + '/src/index.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/dist',
        filename: 'canvas-marquee.js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|test)/,
                query: {
                    presets: ['es2015']
                }
             }
        ]
    },
    resolve: {
        extensions: ['.js']
    }
}

module.exports = config;