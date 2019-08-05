/**
 * 代理本域名下面请求，供开发/测试使用
 * 如一个同域名请求，在dev环境 127.0.0.1:7777/total ，可以代理到 远端的 http://cnpm.51.nb/total
 */


// 更多花式配置，参考文档： http://webpack.github.io/docs/webpack-dev-server.html#proxy
module.exports = {
  '/ops-activity/': {
    target: 'https://test.com/',
    changeOrigin: true,
    pathRewrite: {
      '/': '/mock/5bd7ffdbda3367962e3a9362/5b4465c3bf418a471db4c53f/',
    }
  },
};