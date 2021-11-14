const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackSVGSpritely = require('webpack-svg-spritely');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
// console.log(path.resolve(__dirname, '/icons'));

module.exports = {
    mode: 'development',
    entry: {
        index: ['./app.js', './scss/base.scss'],
    },
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        assetModuleFilename: 'assets/[name][ext]',
        clean: true
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                exclude: path.resolve(__dirname, 'icons/'),
                generator: {
                    filename: 'img/[name].[ext]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[ext]'
                }
            },
            {
                test: /\.svg/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'img/svg_icons'
                        }
                    }
                ]
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management',
        }),
        new WebpackSVGSpritely({
            output: '/img',
            filename: 'svg_sprite.svg',
            // combine: true,
        }),
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                { from: "ignore/develop" },
            ],
        })
    ],
};