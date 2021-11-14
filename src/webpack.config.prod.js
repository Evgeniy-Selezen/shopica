const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
    mode: 'production',
    entry: { index: ['./app.js', './scss/base.scss'] },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Output Management',
        }),
        new MiniCssExtractPlugin(),
        new CopyPlugin({
            patterns: [
                { from: "ignore/production" },
            ],
        })
    ],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        clean: true
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
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    optimization: {
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            // `...`,
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ],
        minimize: true,
    }
};