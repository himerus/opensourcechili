/**
 * @file
 * Webpack configuration file for NodeMaker project.
 *
 * @see https://webpack.js.org/configuration/configuration-types/#exporting-multiple-configurations
 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
const merge = require('webpack-merge');

/**
 * Provides default configurations for all NodeMaker modules.
 */
const defaultConfigs = {
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
    // new HtmlWebpackPlugin(),
  ],
  output: {
    path: path.resolve('./'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg|jpg|png|gif|mp4)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: './images',
              outputPath: './images',
            },
          },
        ],
      },
    ],
  },
  stats: {
    colors: true,
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, './'),
    compress: true,
    port: 9000,
    // hot: true,
  },
};

/**
 * Provides configuration specific to the NodeMaker Core functionality.
 */
const coreConfig = {
  entry: {
    'chili.bundle': glob.sync('./src/js/**/*.js'),
  },
  output: {
    path: path.resolve('./dist'),
    // We add hash to filename to avoid caching issues
    // filename: '[name].[hash].js',
  },
};

/**
 * Combines the configuration of all NodeMaker submodules.
 */
const pkg = [
  merge(defaultConfigs, coreConfig),
];

module.exports = pkg;
