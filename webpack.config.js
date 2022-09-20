const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const DotenvPlugin = require('webpack-dotenv-plugin');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  node: {
    fs: 'empty'
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 9000
  },
  devtool: 'source-map',
  entry: ['@babel/polyfill', path.resolve(__dirname, 'src/index.jsx')],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    fallback: {
        util: require.resolve("util/")
      }
  },
  output: {
    publicPath: '/',
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          // fallback to style-loader in development
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: false
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html'
      // hash: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new DotenvPlugin({
      sample: './.env.default',
      path: './.env'
    }),
    new CompressionPlugin({
      test: /\.(js|html)$/
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true
        },
        extractComments: true,
        cache: true,
        parallel: true,
        sourceMap: process.env.NODE_ENV !== 'production'
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
};
