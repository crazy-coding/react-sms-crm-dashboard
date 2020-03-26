const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const PATHS = {
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './build')
};
var envKeys = {};
Object.keys(process.env).forEach((k) => {
    envKeys[`${k}`] = JSON.stringify(process.env[k]);
}, {});
let ROUTE_ASSET = process.env.ROUTE_ASSET || 'sendplex'
module.exports = {
    context: __dirname,
    mode: 'development',
    entry: {
        app: ['babel-polyfill',PATHS.src],
        vendor: [
            'react',
            'react-dom',
            'react-router',
            'axios'
        ]
    },
    output: {
        path: PATHS.dist,
        filename: `${ROUTE_ASSET}/[name].js`,
        publicPath: '/'
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                sourceMap: true,
                uglifyOptions: {
                    mangle: true,
                    exclude: [/\.min\.js$/gi],
                    output: {
                        comments: false
                    },
                    compress: {
                        drop_console: false
                    }
                }
            })
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.jsm'],
        alias: {
            styles: path.resolve(__dirname, '../src/assets')
        }
    },
    devtool: 'eval-sourcemap',
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
                                }
                            }]

                    ],

                }
            },
            {test: /\.html$/i, loader: 'html-loader'}, {
                test: /\.html$/,
                use: 'file-loader?name=[name].[ext]'
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: "file-loader"
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
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/assets/index.ejs',
            title: 'Sendplex - ',
        
            meta: [
                {
                    name: 'robots',
                    content: 'noindex,nofollow'
                },
                {
                    name: 'description',
                    content: 'Sendplex'
                },
                {
                    name: 'keywords',
                    content: 'Sendplex'
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
            mobile: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        // new CopyWebpackPlugin([
        //     {
        //         from: path.join(PATHS.src, 'favicon.ico'),
        //         to: path.join(PATHS.dist, 'favicon.ico')
        //     },
        //     {
        //         from: path.join(PATHS.src, 'demo/static.js'),
        //         to: path.join(PATHS.dist, 'static.js')
        //     }
        // ]),
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false),
            VERSION: JSON.stringify('1.2.0'),
            DEBUG: true,
            CODE_FRAGMENT: '80 + 5',
            'UIENV': envKeys,
        })
    ],
    devServer: {
        contentBase: PATHS.dist,
        historyApiFallback: true,
        compress: true,
        headers: {
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY'
        },
        proxy: {
            '*.js': {
              target: '*',
              bypass: function (req){
               req.url = `/${ROUTE_ASSET}${req.url}`;
               //console.log(req.url);
              }
            }
        },
        //open: true,
        overlay: {
            warnings: true,
            errors: true
        },
        port: 3010,
        disableHostCheck: true,
        // hot: true
    },
    stats: {
        // Config for minimal console.log mess.
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
    }

};
