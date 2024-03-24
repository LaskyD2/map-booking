const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require('terser-webpack-plugin');
const packageJson = require('./package.json');
const ESLintPlugin = require('eslint-webpack-plugin');
const version = packageJson.name + ' ' + packageJson.version + ' | (c) ' + packageJson.author;

module.exports = {
    entry: ['./src/js/main.js'],
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'map-booking.js'
    },
    module: {
        rules: [
            {
                test: /map-booking\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    },
    target: ['web', 'es5'],
    performance: {
        hints: false
    },
    plugins: [
        new webpack.BannerPlugin(version),

    ]
};
