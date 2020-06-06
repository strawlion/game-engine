const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        index: './src/index.ts',
        ['example/index']: './example/index.ts',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                  'vue-style-loader',
                  'css-loader'
                ]
            }
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        // new CopyPlugin({
        //     patterns: [{ from: './example/terrainGenerator.html', to: '.' }],
        // }),
        new HtmlWebpackPlugin({
            title: 'Terrain Generator',
            filename: 'example/index.html'
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js', '.vue'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
};
