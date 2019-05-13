var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'eval',
    entry: [
        // 'webpack-dev-server/client?http://localhost:3000',
        // 'webpack/hot/only-dev-server',
        './src/RdxVideo',
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'react-html5-video-editor.js',
        // libraryTarget: 'umd',
        library: 'ReactHtml5VideoEditor',
        publicPath: '/static/',
    },
    // plugins: [
    //   new webpack.HotModuleReplacementPlugin()
    // ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
};
