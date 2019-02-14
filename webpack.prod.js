const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const isDev = process.env.NODE_ENV === 'development';
//const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')//用来压缩css文件的 npm install optimize-css-assets-webpack-plugin -D
const config = {
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
     //   new OptimizeCSSPlugin(),//压缩css
         new HTMLPlugin({
            minify: {//html文件的压缩规则
              removeComments: true,//去除注释
              collapseWhitespace: true,//去除空格
              removeAttributeQuotes: true//删除引号，删除不需要引号的值。
            },
        }),
    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                include: [/src/]
            },
            {
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
if (!isDev) {
    config.devtool = 'source-map' // 调试代码时可以看到自己原本的代码，而不是编译后的
}
module.exports = config;