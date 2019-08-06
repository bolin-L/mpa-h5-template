const path = require('path');
const AutoPrefixer = require('autoprefixer');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest2-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const px2rem = require('postcss-px2rem');
const sourceModules = require('./source_modules'); // node_modlues中需要进行源码编译的包
const resolve = require('./resolve');
const glob = require('glob');

const chunkSorts = ['manifest', 'vendor', 'app'];

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
     * 抽出css
     * */
    new ExtractTextPlugin({
        filename: 'css/[name].[contenthash:10].css',
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

function getEntry (rootSrc) {
    const entries = [];
    glob.sync(rootSrc + '/pages/**/index.js')
    .forEach(file => {
        const pageName = file.match(/pages\/(.*)\/index.js/)[1];
        entries.push({
            pageName,
            entry: file,
            template: '../src/index.html',
        })
    })
    return entries;
}

getEntry(resolve.alias.root).forEach(page => {
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
        filename: 'js/[name].[chunkhash:10].js',
        chunkFilename: '[id].[chunkhash:10].js',
        publicPath: './',
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
