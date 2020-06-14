const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        index: './src/index.ts',
        // ['example/index']: './example/index.ts',
        ['example2/indx']: './example2/App.tsx',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            // {
            //     test: /\.vue$/,
            //     loader: 'vue-loader'
            // },
            // {
            //     test: /\.css$/i,
            //     exclude: /node_modules/,
            //     use: [
            //         'style-loader',
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 modules: true,
            //             },
            //         },
            //     ],
            // },
            // {
            //     test: /\.css$/,
            //     use: [
            //       'vue-style-loader',
            //       'css-loader'
            //     ]
            // }
        ],
    },
    plugins: [
        // 'styled-jsx/babel',
        // new VueLoaderPlugin(),
        // new HtmlWebpackPlugin({
        //     title: 'Terrain Generator',
        //     filename: 'example/index.html'
        // }),
        new HtmlWebpackPlugin({
            title: 'Terrain Generator',
            filename: 'example2/index.html'
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js', /*'.vue',*/ '.tsx'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
};
