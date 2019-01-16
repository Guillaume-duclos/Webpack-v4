const _ExtractTextPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = new _ExtractTextPlugin('[name].bundle.css');
module.exports = {
  ExtractTextPlugin: ExtractTextPlugin
};