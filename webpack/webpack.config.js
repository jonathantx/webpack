const modoDev = process.env.NODE_ENV !== 'production'
const webpack  = require('webpack')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const css_minimizer_webpack_plugin = require('css-minimizer-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    mode: modoDev ? 'development' : 'production',
    entry: '/src/principal.js',
    output: {
        filename: 'principal.js',
        path: __dirname + '/public'
    },
    devServer: {
        contentBase: "./public",
        port: 9000
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new css_minimizer_webpack_plugin()
        ],
    },
    plugins: [
        new miniCssExtractPlugin({
            filename: "estilo.css"
        }),
        new TerserPlugin({
            parallel: true,
            terserOptions: {
                ecma: 6,
            },
        }),
    ],
    module: {
        rules: [{   
            test: /\.s?[ac]ss$/,
            use: [
                miniCssExtractPlugin.loader,
                // 'style-loader', // Adiciona CSS a DOM injetando a TAG <style>
                'css-loader', // interpreta @import / url()... 
                'sass-loader'
            ]
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: [ {
                loader: 'file-loader',
                options: {
                  esModule: false
                }
              }]
        }]
    }
}