const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        index: './src/index.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Sketches',
            filename: 'index.html',
            templateContent: ({ htmlWebpackPlugin }) => `
    <html>
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/addons/p5.dom.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/addons/p5.sound.js"></script>
        <style>
            html, body {
                margin: 0;
                padding: 0;
            }
        </style>
        ${htmlWebpackPlugin.tags.headTags}
      </head>
      <body>
      </body>
    </html>
  `
        }),
    ],
    resolve: {
        extensions: ['.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
};
