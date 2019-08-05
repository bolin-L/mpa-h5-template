const path = require('path');

const nodeModules = path.resolve(__dirname, '../node_modules');
// 需要源码打包的模块，正则，相对 node_modules 的位置
const sourcePosition = [
    /^\.\.\/src\//, // src 目录 ../src
];

function sourceModules(pather) {
    const position = path.relative(nodeModules, pather);
    let result = false; // 默认都跳过
    sourcePosition.forEach(item => {
        // 返回 false 需要源码打包
        if (item.test(position)) {
            result = true;
        }
    });
    return result;
}

module.exports = sourceModules;
