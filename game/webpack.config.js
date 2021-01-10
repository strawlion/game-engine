const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        gameEngine: './src/index.ts',
        blobGame: './examples/blob-game/blobGame.ts',
        spaceInvaders: './examples/space-invaders/spaceInvaders.ts',
        spaceMiner: './examples/space-miner/spaceMiner.ts',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: Infinity,
                        },
                    },
                ],
            },
            {
                test: /\.ase$/i,
                use: ['aseprite-loader'],
            },
        ],
    },
    plugins: [
        new CopyPlugin([
            { from: './examples/blob-game', to: '.' },
            { from: './examples/space-invaders', to: '.' },
            { from: './examples/space-miner', to: '.' },
        ]),
    ],
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
};
