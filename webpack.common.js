const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: './src/js/app.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].[hash:8].js',
    chunkFilename: '[name].js'
  },
  resolve: {
    alias: {
      '@css': path.resolve('./src/css/'),
      '@': path.resolve('./src/js/')
    },
    modules: [
      path.resolve('./src'),
      path.resolve("./src/js"),
      path.resolve('./node_modules')
    ],
  },
  module: {
    rules: [
      // HTML
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: false,
            removeComments: true,
            collapseWhitespace: false
          }
        }
      },
      // JS - JSX
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader']
      },
      // ASSETS
      {
        test: /\.(png|jpg|jpeg|gif|svg|mp3|wav|ogg|flac)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[hash:8].[ext]'
            }
          }
        ]
      },
      // FONTS
      {
        test: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
};