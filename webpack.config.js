const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const errorOverlayMiddleware = require('react-error-overlay/middleware');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());

const conditionalPlugins = process.env.NODE_ENV === 'prod' ? [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    output: {
      comments: false
    }
  }),
] : [
  new webpack.HotModuleReplacementPlugin()
];

const elmOptions = process.env.NODE_ENV !== 'prod' ? {
  verbose: true,
  warn: true,
  debug: true,
  forceWatch: true
} : {};

const indexPath = path.resolve(appDirectory, './src/js/index.js');
const templatePath = path.resolve(appDirectory, './public/index.html');
const buildPath = path.resolve(appDirectory, './dist');

const entry = process.env.NODE_ENV !== 'prod' ? [
  require.resolve('react-dev-utils/webpackHotDevClient'),
  require.resolve('webpack/hot/dev-server'),
  indexPath,
] : indexPath;

module.exports = {
  entry,

  output: {
    path: buildPath,
    filename: 'static/js/main-[hash:8].js'
  },

  plugins: conditionalPlugins.concat([
    new HtmlWebpackPlugin({
      inject: true,
      template: templatePath
    }),
    new CopyWebpackPlugin([{
      from: 'public/static/media/',
      to: 'static/media/'
    }, {
      from: 'public/favicon.ico',
    }, {
      from: 'public/manifest.json',
    }]),
  ]),

  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.elm']
  },

  module: {
    rules: [{
        test: /\.js$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: {
          loader: 'babel-loader',
        }
      }, {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            options: {
              minimize: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('postcss-import'),
                require('postcss-cssnext')()
              ]
            }
          }
        ]
      }, {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: {
          loader: 'elm-webpack-loader',
          options: elmOptions
        }
      }
    ],

    noParse: /\.elm$/,
  },

  devServer: {
    historyApiFallback: true,
    compress: true,
    clientLogLevel: 'none',
    contentBase: './public',
    watchContentBase: true,
    hot: true,
    overlay: false,
    quiet: true,
    port: 3000,
    setup(app) {
      app.use(errorOverlayMiddleware());
    }
  },
};
