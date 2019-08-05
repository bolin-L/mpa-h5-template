const axios = require('../axios');
const config = require('./config');

module.exports = {
    getWebCookieValidateV2: param => axios(Object.assign(config.getWebCookieValidateV2, param)),
    postWebSnsWeixinBindV2: param => axios(Object.assign(config.postWebSnsWeixinBindV2, param)),
    getWebSnsWeixinInfoV2: param => axios(Object.assign(config.getWebSnsWeixinInfoV2, param)),
    postWebSnsWeixinLoginV2: param => axios(Object.assign(config.postWebSnsWeixinLoginV2, param)),
    postWebSnsWeixinUnbindV2: param => axios(Object.assign(config.postWebSnsWeixinUnbindV2, param)),
    getWebSnsWeixinWeixinInfoV2: param => axios(Object.assign(config.getWebSnsWeixinWeixinInfoV2, param)),
    getWebSnsWeixinWeixinInfoOpenidV2: param => axios(Object.assign(config.getWebSnsWeixinWeixinInfoOpenidV2, param)),
};
