const path = require('path');
const webpack = require('webpack');
const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './build')
};
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin   = require('compression-webpack-plugin');
const WebpackMonitor = require('webpack-monitor');

var envKeys = {};
Object.keys(process.env).forEach((k) => {
  envKeys[`${k}`] = JSON.stringify(process.env[k]);
}, {});
const ASSET_PATH = process.env.ASSET_PATH || '/';
const IMAGEPATH  = process.env.ASSET_PATH ? `${ASSET_PATH}/` : ASSET_PATH;
const ROUTE_ASSET = process.env.ROUTE_ASSET || 'send_sms'
module.exports = {
  mode: 'production',
  entry: {
    app: ["@babel/polyfill",PATHS.src],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'axios'
    ]
  },
  output: {
    path: PATHS.dist,
    filename: `${ROUTE_ASSET}/[hash].js`,
    publicPath: ASSET_PATH
  },
  resolve: {
    extensions: ['.js', '.jsx', '.jsm']
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['@babel/react', '@babel/preset-env'],
          plugins: ['@babel/proposal-class-properties', "@babel/plugin-transform-react-jsx",
            ["transform-imports", {
              "@material-ui/core": {
                "transform": "@material-ui/core/${member}",
                "preventFullImport": true
              },
              "@material-ui/icons": {
                "transform": "@material-ui/icons/${member}",
                "preventFullImport": true
              },
              "lodash": {
                "transform": "lodash/${member}",
                "preventFullImport": true
              },"json2csv": {
                "transform": "json2csv",
                "preventFullImport": true
              }
            }]

          ],

        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      }, {
        test: /\.html$/,
        use: 'file-loader?name=[name].[ext]'
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          "css-loader",

        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: IMAGEPATH
          }
        }]

      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },
  optimization: {
    minimize: true,
    runtimeChunk: true,
    minimizer: [
      // new UglifyJSPlugin({
      //   sourceMap: false,
      //   cache: false,
      //   parallel: true,
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   uglifyOptions: {
      //     ecma:8,  
      //     warnings: false,
      //     parse: {},
      //     compress: {
      //       drop_console: true,
      //       dead_code: true,
      //     },
      //     mangle: true, 
      //     output: {
      //       comments: false
      //     },
      //     toplevel: false,
      //     nameCache: null,
      //     ie8: false,
      //     keep_fnames: false,
      //   },
        
      // }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
    }

  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    // new WebpackMonitor({
    //   capture: true,
    //   launch: true,
    //   port:9900
    // }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: `${ROUTE_ASSET}/[id].css`
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.html$|\.jsx$|\.css$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new HtmlWebPackPlugin({
      template: './node_modules/html-webpack-template/index.ejs',
      title: 'SendSMS -',
      meta: [{
          name: 'robots',
          content: 'noindex,nofollow'
        },
        {
          name: 'description',
          content: 'SendSMS'
        },
        {
          name: 'keywords',
          content: 'SendSMS'
        }
      ],
      appMountIds: ['render-target'],
      inject: false,
      minify: {
        collapseWhitespace: true,
        conservativeCollapse: true,
        preserveLineBreaks: true,
        useShortDoctype: true,
        html5: true
      },
      mobile: true
    }),
    new webpack.DefinePlugin({
      'UIENV': envKeys,
      'NODE_ENV': JSON.stringify('production')
    }),


  ]
};
