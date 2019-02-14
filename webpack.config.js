const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';

const config = {
    resolve:{
    alias: {
        "@src":path.resolve("./src"),
      }},
    entry: path.join(__dirname, 'src/index.js'), // 入口文件 用path.join(__dirname, 'src/index.js')将路径拼接为绝对路径
    output: {
        filename: 'bundle.js', // 文件输出
        path: path.join(__dirname, '/dist')
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"production"'
            }
        }),
        new HTMLPlugin() // 处理html模版
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                include: [/src/]
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [{
                        loader: "babel-loader"
                    },
                    {
                        loader: "ts-loader"
                    }
                ],
            } ,{
                test: /\.js$/,
                use: ["babel-loader"],
                exclude: [/node_modules/]
            },

            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash:10].[ext]"
                    }
                }]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader' // 处理以.vue结尾的文件
            },
            {
                test: /\.css$/, // 处理css文件
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(gif|jpg|jpeg|png|svg)$/, // 处理图片文件
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[name].[ext]'
                    }
                }]
            }
        ]
    }
}
if (isDev) {
    config.devtool = '#cheap-module-eval-source-map' // 调试代码时可以看到自己原本的代码，而不是编译后的
    config.devServer = {
        port: 8000,
        host: 'localhost',
        overlay: {
            errors: true // 将webpack编译的错误显示在网页上面
        },
        open: false, // 在启用webpack-dev-server时，自动打开浏览器
        historyApiFallback: true,
        historyApiFallback:{
            index:'/index.html'//index.html为当前目录创建的template.html
      }
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}
module.exports = config;