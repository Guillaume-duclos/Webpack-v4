const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common');
const merge = require('webpack-merge');

let config = merge(common, {
  mode: 'production',
  devtool: false,
  optimization: {
    minimizer: [
      new UglifyJSPlugin(),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  module: {
    rules: [
      // CSS - SCSS - SASS
      {
        test: /\.(css|scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin({
      sourceMap: false
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[hash:8].css'
    }),
    new CleanWebpackPlugin(
      pathsToClean = 'build'
    )
  ]
});

module.exports = config;