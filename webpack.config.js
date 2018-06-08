const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const regProject = new RegExp('--env\.project', 'gi');
const regIsDev = new RegExp('--env\.dev-enviroment', 'gi');

const sourcePath = path.join(__dirname, "src");

const pluginsList = [
    new ExtractTextPlugin({
        filename: "[name].css",
    }),
    new ProgressBarPlugin({
        clear: false,
    }),
    new HtmlWebPackPlugin({
        template: "./index.html",
        filename: "./index.html"
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css"
    })
];

if (process.env.WEBPACK_MODE === 'production') {
    pluginsList.push(
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new UglifyJsPlugin({
            extractComments: true, 
            parallel: true,
            sourceMap: false,
            uglifyOptions: {
                safari10: true
            }
        })
    )
}

module.exports = {
    context: sourcePath,
    // entry point of our application, within the `src` directory (which we add to resolve.modules below):
    entry: {
        index: ['./app.jsx'],
    },

    // configure the output directory and publicPath for the devServer
    output: {
        path: path.join(__dirname, "./build"),
        // path: path.join(__dirname, "./build"),
        filename: "[name].js",
    },


    resolve: {

        extensions: [ '.js', '.jsx', '.scss'],
        modules: ['components', 'node_modules']
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                  {
                    loader: "html-loader"
                  }
                ]
              },
              {
                test: /\.jsx?$/,
                loader: "babel-loader",

            },
            {
                test: /\.svg$/,
                use: [{
                  loader: "svg-sprite-loader"
                }]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader?modules&localIdentName=[local]']
                })
            },
            {
                test: /\.scss$/,
                use: [
                    // fallback to style-loader in development
                    'style-loader',
                    "css-loader?modules&localIdentName=[name]--[local]",
                    "sass-loader"
                ]
            }
 
        ],
    },
    plugins: pluginsList,
     devServer: {
         port: 8081,
         contentBase: path.resolve(__dirname, 'build'),
         historyApiFallback: true
     }
};
