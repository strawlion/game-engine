const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        gameEngine: './src/index.ts',
        spaceInvaders: './examples/space-invaders/spaceInvaders.ts',
        spaceMiner: './examples/space-miner/spaceMiner.ts',
        terrainGenerator: './examples/terrain-generator/terrainGenerator.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CopyPlugin([
            { from: './examples/space-invaders', to: '.' },
            { from: './examples/space-miner', to: '.' },
            { from: './examples/terrain-generator', to: '.' },
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
