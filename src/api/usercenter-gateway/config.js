// usercenter-gateway config

module.exports = {
    getWebCookieValidateV2: {
        url: '/v2/web/cookie/validate',
        method: 'get',
        baseURL: '/api.u51.com/usercenter-gateway/api',
    },
    postWebSnsWeixinBindV2: {
        url: '/v2/web/sns/weixin/bind',
        method: 'post',
        baseURL: '/api.u51.com/usercenter-gateway/api',
    },
    getWebSnsWeixinInfoV2: {
        url: '/v2/web/sns/weixin/info',
        method: 'get',
        baseURL: '/api.u51.com/usercenter-gateway/api',
    },
    postWebSnsWeixinLoginV2: {
        url: '/v2/web/sns/weixin/login',
        method: 'post',
        baseURL: '/api.u51.com/usercenter-gateway/api',
        hiddenToast: true,
    },
    postWebSnsWeixinUnbindV2: {
        url: '/v2/web/sns/weixin/unbind',
        method: 'post',
        baseURL: '/api.u51.com/usercenter-gateway/api',
    },
    getWebSnsWeixinWeixinInfoV2: {
        url: '/v2/web/sns/weixin/weixinInfo',
        method: 'get',
        baseURL: '/api.u51.com/usercenter-gateway/api',
    },
    getWebSnsWeixinWeixinInfoOpenidV2: {
        url: '/v2/web/sns/weixin/weixinInfo/openid',
        method: 'get',
        baseURL: '/api.u51.com/usercenter-gateway/api',
    },
};
