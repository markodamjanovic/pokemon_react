const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {

  const DEST_DIR = '../server/src';

  const config = {
    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, `${DEST_DIR}/public`),
      filename: 'script/[name].js'
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)?$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(scss)$/,
          use: [{
            // inject CSS to page
            loader: 'style-loader'
          }, {
            // translates CSS into CommonJS modules
            loader: 'css-loader'
          }, {
            // Run postcss actions
            loader: 'postcss-loader',
            options: {
              // `postcssOptions` is needed for postcss 8.x;
              // if you use postcss 7.x skip the key
              postcssOptions: {
                // postcss plugins, can be exported to postcss.config.js
                plugins: function () {
                  return [
                    require('autoprefixer')
                  ];
                }
              }
            }
          }, {
            // compiles Sass to CSS
            loader: 'sass-loader'
          }]
        },
        {
          test: /\.(gif|mp3|svg)$/,
          use: {
            loader: 'file-loader',
            options:{
              name: '[name].[ext]',
              public: '/',
              outputPath:'/'
            }
          }
        },
        {
          test: /\.(png|jpeg|jpg)$/,
          use:{
            loader: 'file-loader',
            options:{
              name: '[name].[ext]',
              outputPath: '/',
              publicPath: '/',
            }
          }
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          include: path.resolve(__dirname, './node_modules/bootstrap-icons/font/fonts'),
          use: {
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]',
                  outputPath: 'assets/bootstrap-icons',
                  publicPath: '../assets/bootstrap-icons',
              },
          }
        }
      ]
    },
    resolve: {
      extensions: [
        '.js',
        '.jsx',
        '.tsx',
        '.ts'
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        appMountId: 'app',
        // generiramo Express partial koji će bit umetnut u <head>
        filename: path.resolve(__dirname, `${DEST_DIR}/views/partials/html-head--scripts.ejs`),
        inject: false,
        publicPath: "/",
        // overridam default template kako ne bi bio generiran <head> tag
        templateContent: ({htmlWebpackPlugin}) => `${htmlWebpackPlugin.tags.headTags}`
      }),
      new MiniCssExtractPlugin({
        filename: 'style/[name].css',
        chunkFilename: 'style/[name].css',
      }),
      new CleanWebpackPlugin()
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    }
  };

  return(config);
};