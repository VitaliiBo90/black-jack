const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: './src/js/index.js',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      filename: 'index.html',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css'
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src/css/main.css'),
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)$/i,
      //   type: 'asset/resource'
      // }
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.PNG$|\.svg$|\.woff(2)?$|\.ttf$|\.eot$/,
        loader: 'file-loader',
        options: {
          name: 'cards/[name].[ext]'
        }  
      }
    ],
  },
};