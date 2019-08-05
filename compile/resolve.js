const path = require('path');

module.exports = {
    alias: {
        root: path.resolve(__dirname, '../src'),
        // vue$: 'vue/dist/vue.common.js',
    },
    extensions: ['.js', '.vue'],
    // 替换extensions的空字符串 https://webpack.js.org/configuration/resolve/#resolve-enforceextension
    enforceExtension: false,
};
