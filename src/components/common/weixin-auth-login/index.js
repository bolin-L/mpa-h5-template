import { Toast } from '@u51/week-ui';
import qs from 'qs-url';
import UsercenterGateway from '../../../api/usercenter-gateway/api';

const location = window.location || {};
const Medusa = window.Medusa || {};

const wxAuth = {
    config: {},
    appIdConfig: {
        dev: {
            appId: 112,
            wxAppId: 'wxd72886761f4c6b07',
        },
        online: {
            appId: 120,
            wxAppId: 'wxa901f052c48a50dd',
        }
    },
    appId: '',
    code: qs.getQuery('code'),
    wxAuthUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize',

    init: config => {
        const env = process.env.BUILD_ENV !== 'prod' ? 'dev' : 'online';
        // const env = 'online';

        wxAuth.config = config || {};
        wxAuth.appInfo = Object.assign({}, config.appInfo);
        wxAuth.appId = wxAuth.appIdConfig[env].wxAppId;
        wxAuth.appInfo.app_id = wxAuth.appIdConfig[env].appId;

        if (wxAuth.code && wxAuth.config.isGetWeixinInfo) {
            wxAuth.snsWeixinInfo(wxAuth.code);
            return;
        }

        if (wxAuth.code) {
            wxAuth.snsWeixinLogin(wxAuth.code);
            return;
        }

        wxAuth.wxAuth();
    },

    snsWeixinLogin() {
        UsercenterGateway.postWebSnsWeixinLoginV2({
            data: {
                code: wxAuth.code,
                target: location.href,
            },
            params: Object.assign({
                scenes: 1,
                md: Medusa && (Medusa.getMd() || ''),
            }, wxAuth.appInfo),
        }).then(res => {
            if (typeof wxAuth.config.weixinLoginSuccess === 'function') {
                wxAuth.config.weixinLoginSuccess(res);
            }
        }).catch(error => {
            if (typeof wxAuth.config.weixinLoginFail === 'function') {
                wxAuth.config.weixinLoginFail(error);
            }
        });
    },

    snsWeixinInfo() {
        UsercenterGateway.getWebSnsWeixinWeixinInfoV2({
            params: Object.assign({
                code: wxAuth.code,
                scenes: 1,
                md: Medusa && (Medusa.getMd() || ''),
            }, wxAuth.appInfo),
        }).then(res => {
            if (typeof wxAuth.config.success === 'function') {
                wxAuth.config.success(res);
            }
        }).catch(error => {
            if (typeof wxAuth.config.fail === 'function') {
                wxAuth.config.fail(error);
            }
            if (error && error.status >= 500) {
                Toast(error.message, 1500);
            }
        });
    },

    snsWeixinBind(token, userId, callback) {
        UsercenterGateway.postWebSnsWeixinBindV2({
            headers: {
                Authorization: `encrypt ${token}`,
            },
            data: {
                code: wxAuth.code,
            },
            params: Object.assign({
                scenes: 0,
                userId,
                md: Medusa && (Medusa.getMd() || ''),
            }, wxAuth.appInfo),
        }).then(res => {
            if (typeof callback === 'function') {
                callback(res);
            }
        }).catch(error => {
            Toast(`绑定失败${JSON.stringify(error || {})}`, 1500);
        });
    },

    wxAuth() {
        const url = `${wxAuth.wxAuthUrl}?appid=${wxAuth.appId}&redirect_uri=${encodeURIComponent(location.href)}&response_type=code&scope=snsapi_userinfo&state=aaa#wechat_redirect`;
        location.href = url;
    },
};

export default wxAuth;
