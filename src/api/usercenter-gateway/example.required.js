import UsercenterGateway from './api/usercenter-gateway/api';


/**
* 验证Cookie是否有效    /v2/web/cookie/validate
*
*/
UsercenterGateway.getWebCookieValidateV2({
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* 绑定    /v2/web/sns/weixin/bind
*
*/
UsercenterGateway.postWebSnsWeixinBindV2({
    params: {
        userId: 'undefined', //UserId
    },
    data: {
        bindRequest: {
    "code": "(string) 接口调用凭证"
}, //bindRequest
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* 获取关联的微信用户信息    /v2/web/sns/weixin/info
*
*/
UsercenterGateway.getWebSnsWeixinInfoV2({
    params: {
        userId: 'undefined', //UserId
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* 登陆    /v2/web/sns/weixin/login
*
*/
UsercenterGateway.postWebSnsWeixinLoginV2({
    data: {
        loginRequest: {
    "code": "(string) 接口调用凭证",
    "target": "(string) 重定向地址"
}, //loginRequest
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* 解绑    /v2/web/sns/weixin/unbind
*
*/
UsercenterGateway.postWebSnsWeixinUnbindV2({
    params: {
        userId: 'undefined', //UserId
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* [snsapi_userinfo授权]根据code查询微信用户信息    /v2/web/sns/weixin/weixinInfo
*
*/
UsercenterGateway.getWebSnsWeixinWeixinInfoV2({
    params: {
        code: 'undefined', //code
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* [snsapi_base授权专用]根据code查询微信用户OpenID信息(注意:和其他接口的code缓存不通用)    /v2/web/sns/weixin/weixinInfo/openid
*
*/
UsercenterGateway.getWebSnsWeixinWeixinInfoOpenidV2({
    params: {
        code: 'undefined', //code
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});
