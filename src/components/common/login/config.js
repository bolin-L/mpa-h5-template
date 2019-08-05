const config = {};
let host = '/api.u51.com';
/*eslint-disable*/
if (~location.host.indexOf('geinihua') || ~location.host.indexOf('99fenqi') || ~location.host.indexOf('scdn') ) {
    host = '//api.u51.com';
}
config.captcha = `${host}/usercenter-gateway/api/v2/web/captcha`;
config.login = `${host}/usercenter-gateway/api/v2/web/login`;
config.reg = `${host}/usercenter-gateway/api/v2/web/register`;
config.sms = `${host}/usercenter-gateway/api/v2/web/sms/send`;
config.both = `${host}/usercenter-gateway/api/v2/web/login-register`;
config.smsverify = `${host}/usercenter-gateway/api/v2/web/sms/send/verify`;
export default config;
