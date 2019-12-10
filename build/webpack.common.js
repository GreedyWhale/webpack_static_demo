const { setAllEntries, setHtmlPlugin } = require('./helper')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  entry: setAllEntries(),
  output: {
    filename: devMode ? 'js/[name]_[hash].js' : 'js/[name]_[contenthash].js',
    chunkFilename: devMode ? 'js/[name]_[hash].js' : 'js/[name]_[contenthash].js',
    path: path.resolve('dist')
  },
  resolve: {
    alias: {
      '@': path.resolve('src')
    },
    extensions: ['.js', '.json', '.scss']
  },
  module: {
    rules: [
      { test: /\.pug$/, exclude: /node_modules/, include: path.resolve('src'), loader: 'pug-loader' },
      { test: /\.js$/, exclude: /node_modules/, include: path.resolve('src'), loader: 'babel-loader' },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        exclude: /node_modules/,
        include: path.resolve('src'),
        use: [{
          loader: 'url-loader',
          options: {
            name: devMode ? '[name]_[hash].[ext]' : '[name]_[contenthash].[ext]',
            outputPath: path.join('assets', 'images'),
            limit: 30000
          }
        }]
      },
      {
        test: /\.(s?css)$/,
        exclude: /node_modules/,
        include: path.resolve('src'),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
              reloadAll: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: path.resolve('src', 'public'), to: path.resolve('dist') }
    ]),
    ...setHtmlPlugin(),
    new MiniCssExtractPlugin({
      filename: devMode ? 'css/[name].css' : 'css/[name].[contenthash].css',
      chunkFilename: devMode ? 'css/[name].css' : 'css/[name].[contenthash].css'
    }),
    new CleanWebpackPlugin()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common',
          test: /[\\/]utils[\\/]/,
          chunks: 'all',
          priority: 0,
          minChunks: 3
        },
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 10,
          minChunks: 3
        },
        'common-style': {
          name: 'common_style',
          test: /[\\/]common\.scss$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
}
