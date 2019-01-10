const HTMLPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: './src/app.js'
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[hash:8].js',
    chunkFilename: "[name].js"
  },

  devServer: {
    contentBase: path.join(__dirname, './build'),
    compress: true,
    port: 3000
  },

  plugins: [
    new HTMLPlugin({ template: './src/index.html' })
  ],

  module: {
    // HTML
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader'
        }
      },
      // JS
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        },
      },
      // CSS
      {
        test: /\.(css|scss|sass)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'style-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      // ASSETS AND FONTS
      {
        test: /\.(png|jpg|jpeg|gif|svg|mp3|wav|ogg|flac|woff|woff2|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
};