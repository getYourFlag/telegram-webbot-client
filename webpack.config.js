const path = require("path");
const outputDirectory = "public";

module.exports = {
    entry: ["babel-polyfill", "./src/client/index.js"],
    output: {
        path: path.join(__dirname, outputDirectory),
        filename: "bundle.js",
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        port: 3000,
        contentBase: path.join(__dirname, outputDirectory),
        proxy: {
            "/api": {
                target: "http://127.0.0.1:8080"
            }
        }
    },
    node: {
        fs: 'empty'
    }
};