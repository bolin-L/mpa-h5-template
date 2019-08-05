const path = require('path');
const AutoPrefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest2-webpack-plugin');
const ScriptAttrHtmlWebpackPlugin = require('@u51/script-attr-html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const px2rem = require('@u51/postcss-px2rem');
const projecName = require('../package.json').name;
const sourceModules = require('./source_modules'); // node_modlues中需要进行源码编译的包
const resolve = require('./resolve');

const chunkSorts = ['manifest', 'vendor', 'app'];
const CDN_ADDRESS = {
    // img: "//pic.51zhangdan.com/u51/",
    static: '//h5.u51.com/web.u51.com/storage/',
};

const px2remConfigs = {
    baseDpr: 1,
    remUnit: 37.5,
    onePxComment: '1px',
    // androidOpen: true,
    // androidDprs: [2.0, 3.0],
    forcePxComment: '!px',
    keepComment: '!no',
    forcePxProperty: ['font-size'],
};

const plugins = [
    /*
     * html文件，manifest保证打包出来的文件最小版本变动
     * https://github.com/webpack/webpack/issues/1150
     * */
    // new HtmlWebpackPlugin({
    //     template: path.resolve(__dirname, '../src/index.html'),
    //     filename: './index.html',
    //     excludeChunks: ['manifest'],
    //     chunksSortMode: (a, b) => chunkSorts.indexOf(a.names[0]) - chunkSorts.indexOf(b.names[0]),
    // }),
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
            NODE_ENV: '"production"',
            // 枚举值 prod: 线上 | test: 测试 | pre: 预发 | stable_project： stable环境
            BUILD_ENV: JSON.stringify(process.env.BUILD_ENV),
        },
    }),
    /*
     * 孔明灯
     * */
    new ScriptAttrHtmlWebpackPlugin({
        chunks: [/\/\/h5.u51.com\//i],
        attributes: { crossorigin: 'anonymous' },
    }),
    /*
     * 抽出css
     * */
    new ExtractTextPlugin({
        filename: '[name].[contenthash:10].css',
        allChunks: true,
    }),

    new webpack.LoaderOptionsPlugin({
        vue: {
            postcss: [
                px2rem(px2remConfigs),
                AutoPrefixer({ browsers: ['last 20 versions'] }),
            ],
            loaders: {
                css: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                }),
                less: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'less-loader',
                        },
                    ],
                }),
                sass: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                }),
                scss: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                }),
            },
        },
        options: {
            postcss: () => ([
                px2rem(px2remConfigs), // 手淘rem解决适配问题
                AutoPrefixer({ browsers: ['last 20 versions'] }),
            ]),
        },
    }),
];

if (process.env.ANA === '1') {
    plugins.push(new BundleAnalyzerPlugin());
}

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
        pageName: 'order',
        entry: '../src/pages/order/index.js',
        template: '../src/index.html'
    },
    {
        pageName: 'coupon',
        entry: '../src/pages/coupon/index.js',
        template: '../src/index.html'
    },
    {
        pageName: 'card-manage',
        entry: '../src/pages/card-manage/index.js',
        template: '../src/index.html'
    },
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
    // entry: {
    //     vendor: ['vue'],
    //     app: [path.resolve(__dirname, '../src/index')],
    // },
    entry,
    /*
     * 打包产物输出目录
     * */
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: '[name].[chunkhash:10].js',
        chunkFilename: '[id].[chunkhash:10].js',
        publicPath: `${CDN_ADDRESS.static}${projecName}/`,
        // publicPath: './',
        crossOriginLoading: 'anonymous', // 有chunk并且资源文件是在h5.u51.com的工程
    },
    module: {
        loaders: [
            { test: /\.js|\.jsx$/, include: sourceModules, use: 'babel-loader' },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'postcss-loader',
                        },
                    ],
                }),
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'postcss-loader',
                        },
                        {
                            loader: 'sass-loader',
                        },
                    ],
                }),
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
    resolve,
    plugins,
};
