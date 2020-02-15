const path = require("path");
const outputDirectory = "public";

module.exports = {
    entry: [ "./src/client/index.js"],
    output: {
        path: path.join(__dirname, outputDirectory),
        filename: "bundle.js"
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    devServer: {
        port: 3000,
        open: true,
        contentBase: path.join(__dirname, outputDirectory),
        proxy: {
            "/api": "http://localhost:8080"
        }
    },
};