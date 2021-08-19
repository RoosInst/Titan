const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    entry: ["regenerator-runtime/runtime.js","./src/RunApp.js"],
    mode: 'development',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
        
    },
    module: {
        rules: [
        {
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: ["style-loader","css-loader"],
        },
        {
            test: /\.scss$/,
            use: ["style-loader","css-loader","sass-loader"],
        },
    ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'public')
    },
    resolve: {
        fallback: {
            fs: false,
            path: false  
        }
    },
    plugins: [
        new NodePolyfillPlugin(),
        new CopyPlugin({
          patterns: [
            { 
                from: 'node_modules/sql.js/dist/sql-wasm.wasm',
                to: 'sql-wasm.wasm'
            },
          ],
        }),
      ],
      devtool: "source-map",
    
};