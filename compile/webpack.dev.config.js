const path = require('path');
const AutoPrefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html inject
const InlineManifestWebpackPlugin = require('inline-manifest2-webpack-plugin'); // inline script
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const px2rem = require('postcss-px2rem');

const sourceModules = require('./source_modules'); // node_modlues中需要进行源码编译的包
const proxy = require('./proxy');
const resolve = require('./resolve');

const chunkSorts = ['manifest', 'vendor', 'app'];
const px2remConfigs = {
    baseDpr: 1,
    remUnit: 37.5,
    onePxComment: '1px',
    forcePxComment: '!px',
    keepComment: '!no',
    forcePxProperty: ['font-size'],
};

const plugins = [
    /*
    * 抽出公共文件
    * */
    new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest'],
    }),
    /*
    * 将manifest打包成inline脚本
    * */
    new InlineManifestWebpackPlugin({
        name: 'webpackManifest',
        deleteFile: false,
    }),
    /*
    * 注入环境变量，可直接在js中使用
    * */
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"development"',
            px2remConfig: JSON.stringify(px2remConfigs),
        },
    }),
    /*
    * 抽出css
    * */
    new ExtractTextPlugin('[name].[contenthash:10].css'),

    new webpack.LoaderOptionsPlugin({
        vue: {
            postcss: [
                px2rem(px2remConfigs),
                AutoPrefixer({ browsers: ['last 20 versions'] }),
            ],
            loaders: {
                css: 'style-loader!css-loader',
                sass: 'style-loader!css-loader!sass-loader',
                scss: 'style-loader!css-loader!sass-loader',
            },
        },
        options: {
            postcss: () => ([
                px2rem(px2remConfigs), // 手淘rem解决适配问题
                AutoPrefixer({ browsers: ['last 20 versions'] }),
            ]),
        },
    }),
    new webpack.HotModuleReplacementPlugin(),
];

const entry = {
    vendor: ['vue'],
};

[
    {
        pageName: 'app',
        entry: '../src/pages/index/index.js',
        template: '../src/index.html',
        filename: 'index.html', // default [pageName].html
    },
    {
        pageName: 'detail',
        entry: '../src/pages/detail/index.js',
        template: '../src/index.html'
    },
    {
        pageName: 'bill',
        entry: '../src/pages/bill/index.js',
        template: '../src/index.html'
    },
    {
        pageName: 'share',
        entry: '../src/pages/share/index.js',
        template: '../src/index.html'
    },
    {
        pageName: 'take-cash',
        entry: '../src/pages/take-cash/index.js',
        template: '../src/index.html'
    },
    {
        pageName: 'login',
        entry: '../src/pages/login/index.js',
        template: '../src/index.html'
    },
    {
        pageName: 'invite',
        entry: '../src/pages/invite/index.js',
        template: '../src/index.html'
    },
    {
        pageName: 'card-manage',
        entry: '../src/pages/card-manage/index.js',
        template: '../src/index.html'
    },
    {
        pageName: 'coupon',
        entry: '../src/pages/coupon/index.js',
        template: '../src/index.html'
    },
    {
        pageName: 'order',
        entry: '../src/pages/order/index.js',
        template: '../src/index.html'
    }
].forEach(page => {
    entry[page.pageName] = [path.resolve(__dirname, page.entry)];
    plugins.push(new HtmlWebpackPlugin({
        template: path.resolve(__dirname, page.template),
        filename: `./${page.filename || page.pageName + '.html'}`,
        chunks: ['vendor', page.pageName],
    }));
});

module.exports = {
    /*
    * 入口文件
    * vendor：公共文件，抽出来可缓存时间较长
    * app: 业务文件，频繁改动
    * */
    entry,
    /*
    * 打包产物输出目录
    * */
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: '[name].[hash:10].js',
        chunkFilename: '[id].[chunkhash:10].js',
        crossOriginLoading: "anonymous" // 有chunk并且资源文件是在h5.u51.com的工程
    },
    module: {
        rules: [
            { test: /\.js|\.jsx$/, include: sourceModules, use: 'babel-loader' },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader' },
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'postcss-loader' },
                    { loader: 'sass-loader' },
                ],
            },
            { test: /\.vue$/, include: sourceModules, use: 'vue-loader' },
            {
                test: /\.ttf$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 50000,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 20240 },
                    },
                    // { loader: 'img-loader' },
                ],
                // include: path.resolve(__dirname, '../src'),
            },
        ],
    },

    /*
    * vue的postcss需要单独配置，因为vue-loader接管了.vue文件的loader
    * */
    plugins,
    // devtool: 'inline-source-map',
    resolve,
    /*
    * 代理请求
    * */
    devServer: {
        contentBase: path.join(__dirname, '../src'),
        proxy,
        port: 7777,
        compress: true,
        host: '0.0.0.0',
        disableHostCheck: true,
        clientLogLevel: 'info',
        hot: true,
        // hotOnly: false,
        // inline: false,
        lazy: false,
        watchContentBase: false,
    },
};
