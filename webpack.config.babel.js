import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const resolve = fp => path.resolve(__dirname, fp);
const IS_DEV = require('isdev');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      './app/js/index.js'
    ]
  },
  output: {
    path: resolve('./priv'),
    publicPath: '/',
    filename: "js/[name].js"
  },
  devServer: {
      port: 8080,
      inline: true,
      contentBase: resolve("./priv"),
      historyApiFallback: {
          index: '/'
      }
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader!postcss-loader?sourceMap=inline'
        })
      }, {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|vendor)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=assets/fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("./package.json").version)
    }),
    new ExtractTextPlugin('css/app.css'),
    new CopyWebpackPlugin([
      {
        context: 'app/assets',
        from: '**/*',
        to: 'assets'
      },
      {
        from: './app/data/nodes.json',
        to: './data'
      },
      {
        context: 'app/',
        from: '*.html',
        to: './'
      }
    ]),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
    })
  ]
};
