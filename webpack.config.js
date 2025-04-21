const path = require("path");
const PugPlugin = require('pug-plugin');

const mode = process.env.NODE_ENV || "development" ;

const devMode = mode === "development";

const target = devMode ? "web" : "browserslist";
const devtool = devMode ? "source-map" : undefined;

module.exports = {
    mode,
    target,
    devtool,
    entry: {
        index: path.resolve(__dirname, 'index.pug')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new PugPlugin({
          pretty: devMode,
          js: {
            filename: '[name].[contenthash].js',
          },
          css: {
            filename: '[name].[contenthash].css',
          },
        })
      ],
      module: {
        rules: [
            {
                test: /\.pug$/,
                loader: PugPlugin.loader,
            },
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|jpg|jpeg|ico)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'media/[name].[hash][ext]'
                },
            },
            {
                test: /\.svg$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'media/[name][ext][query]'
                },
            },
        ],
    },
}