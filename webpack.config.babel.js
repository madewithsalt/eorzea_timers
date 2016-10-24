import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const resolve = fp => path.resolve(__dirname, fp);

module.exports = {
    context: resolve('./src'),
    entry: {
        index: ['babel-polyfill', 'bootstrap-loader', './js/main.js'],
    },
    output: {
        path: resolve('./public'),
        publicPath: '/',
        filename: 'index.js'
    },
    devServer: {
        inline: true,
        port:8080,
        historyApiFallback: {
          index: '/'
        }
    },
    module: {
        resolve: {
            extensions: ['', '.js', '.styl']
        },
        loaders: [
            { test: /\.sass$/, loader: "style!css?importLoaders=1!sass!postcss?sourceMap=inline" },
            // { test: /\.rt$/, loader: "react-templates-loader?modules=amd" },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components|assets_prev)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    postcss: function () {
      return [
        require('postcss-smart-import')({ /* ...options */ }),
        require('precss')({ /* ...options */ }),
        require('autoprefixer')({ /* ...options */ })
      ];
    },
    plugins: [
      new webpack.DefinePlugin({
        VERSION: JSON.stringify(require("./package.json").version)
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Tether: "tether",
        "window.Tether": "tether",
        Tooltip: "exports?Tooltip!bootstrap/js/dist/tooltip",
        Alert: "exports?Alert!bootstrap/js/dist/alert",
        Button: "exports?Button!bootstrap/js/dist/button",
        Carousel: "exports?Carousel!bootstrap/js/dist/carousel",
        Collapse: "exports?Collapse!bootstrap/js/dist/collapse",
        Dropdown: "exports?Dropdown!bootstrap/js/dist/dropdown",
        Modal: "exports?Modal!bootstrap/js/dist/modal",
        Popover: "exports?Popover!bootstrap/js/dist/popover",
        Scrollspy: "exports?Scrollspy!bootstrap/js/dist/scrollspy",
        Tab: "exports?Tab!bootstrap/js/dist/tab",
        Tooltip: "exports?Tooltip!bootstrap/js/dist/tooltip",
        Util: "exports?Util!bootstrap/js/dist/util",
      })
    ]
};
