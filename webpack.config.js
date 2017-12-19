let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve('build'),
        filename: "bundle.js"
    },
    //可以配置一个源代码到打包后代码的一个映射，可以在控制台看到源代码代码报错的行数，而非bundle.js里的行数
    devtool: "cheap-module-source-map",
    devServer: {
        historyApiFallback:true, //因为是单页面应用，所以在刷新url时，浏览器默认请求的是新的页面，将会获取不到，配置这个就会每次都会重新访问首页
        //如果请求路径是以/api开头的话，会由3000这个服务来进行解析处理，这个代理不是很好用
        proxy: {
            "/api": "http://localhost:3000"
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    "presets": [
                        "env", "react"
                    ],
                    "plugins": [
                        "transform-object-rest-spread",
                        "transform-class-properties",
                        [
                            'transform-runtime',
                            {
                                'helpers':false,
                                'polyfill':false,
                                'regenerator':true,
                                'moduleName':'babel-runtime'
                            }
                        ]
                    ]
                }
            },
            {
                test: /.less$/,
                loaders: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.(jpg|png|gif)$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
}
