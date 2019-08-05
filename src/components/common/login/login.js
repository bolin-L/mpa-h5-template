import axios from '@u51/axios/dist/axios-h5';
import { Toast } from '@u51/week-ui';
import rsa from '@u51/rsa/rsa-lite';
import { querystring as qs, getWTF, setCookie } from './util';
import config from './config';
import getHub from './event-hub';

axios.defaults.siren = true;

const baseParam = {
    plat: 4,
    channel: 'shequ-pc',
    version: '1.0.0',
};

rsa.initMyRSA('8b4b2b43c0510e47ccd94fde841a9b200ba371bf1e0b9b9e5d23cba68e33f6d6b51951d9fd00b740132357c45e9b039346240c0f344f793ea6634507c5c9fa1ffc9c2e7288e2a7341995d446f9d5d5fea772aa2195a7c093441646a3531e6a28f9d647165d47262ed6c6814d3f81ae442dd11029553f0d2158f34e596016ec85');

export default {
    props: {
        outerData: Object,
    },
    watch: {
        showImgCode(val) {
            this.showImgDiv = ~this.types.indexOf(2) && val;
        },
        regphoneNum() {
            this.watchValue();
        },
        regPass() {
            this.watchValue();
        },
        smsCode() {
            this.watchValue();
        },
        imgCode() {
            this.watchValue();
        },
    },
    data() {
        return {
            loginerror: false,
            registerUserError: false,
            registerPassError: false,
            regPicVerifyError: false,  // 注册图形验证码 是否错误
            regSmsVerifyError: false, // 注册短信验证码 是否错误
            btnText: '获取验证码',
            codeIndex: 0,
            interval: 59,
            showlogo: '',    // 是否展示logo
            showtab: '', // 是否展示tab
            regphoneNum: '', // 注册用户名
            regPass: '', // 注册密码
            imgCode: '', // 图形验证码
            smsCode: '', // 短信验证码
            imgDataUrl: '', // image data url
            regSmsErrText: '', // 验证码报错提示语
            loginErrorText: '', // 登录错误提示语
            types: [0, 1, 2, 3],
            actionType: '',   // 登录（login） 或注册(reg） or both
            showbutton: 0,
            isValid: true,
            service: '',
            invitationCode: '', // 邀请码
            showicon: true,
            showImgCode: false,
            passPlaceHolder: '',
            showImgDiv: false,
            btnColorChange: false, //  读秒时候换颜色
            x1: true,
            x2: true,
            x3: true,
            x4: true,
            log: null,
            noBlur: false,  // 不需要blur。 如果登录单页 嵌入的iframe中有 input。键盘会出现马上消失
        };
    },
    methods: {
        // 点登录后触发
        async login() {
            if (!this.isValid) {
                return;
            }
            if (!this.checkMust()) {
                return;
            }
            this.allBlur();
            this.mdlog('ZCY001_07', '登录注册点击', {
                phone: this.regphoneNum,
                smsCode: this.smsCode,
                imgCode: this.imgCode,
                type: 'login'
            });
            try {
                const payload = { ...baseParam, md: Medusa.getMd() };
                const partUrl = qs.stringify(payload);
                const postPayload = { username: rsa.encrypt(this.regphoneNum) };
                if (this.regPass) {
                    postPayload.password = rsa.encrypt(this.regPass);
                } else if (this.smsCode) {
                    postPayload.verifyCode = this.smsCode;
                }

                const result = await axios.post(`${config.login}?${partUrl}`, postPayload);
                if (result.status === 200) {
                    this.mdlog('ZCY001_21', '注册成功／登录成功', {
                        phone: this.regphoneNum,
                        userId: result.data.userId,
                        type: 'login'
                    });
                    setCookie('pg_uid', `${result.data.userId}`);
                    this.sendMsg({ ...result.data, type: 'login' });
                    this.resetIframe();
                }
            } catch (e) {
                const error = e.response.data.errors? e.response.data.errors[0] : e.response.data;
                Toast(error.message, 1500);
                this.mdlog('ZCY001_22', '注册失败／登录失败', {
                    ...error
                });
                this.sendMsg({ ...error, evnetType: 'backendError', errorPlace: 'login' });
            }
        },
        // 注册登录
        async loginReg() {
            if (!this.isValid) {
                return;
            }
            if (~this.types.indexOf(0) && !this.checkMobile(true)) {
                this.$toast('请正确输入手机号');
                return false;
            }
            if (!this.checkMust()) {
                return;
            }
            this.allBlur();
            this.mdlog('ZCY001_07', '登录注册点击', {
                phone: this.regphoneNum,
                smsCode: this.smsCode,
                imgCode: this.imgCode,
                type: 'loginReg'
            });
            // added by liuzhongzheng
            const wtf = getWTF();
            try {
                let payload;
                if (wtf) {
                    payload = { ...baseParam, md: Medusa.getMd(), wtf };
                } else {
                    payload = { ...baseParam, md: Medusa.getMd() };
                }
                payload = { ...baseParam, md: Medusa.getMd(), wtf };
                const partUrl = qs.stringify(payload);
                const postPayload = { mobile: rsa.encrypt(this.regphoneNum), verifyCode: this.smsCode };
                if (this.invitationCode && this.invitationCode !== 'undefined') {
                    postPayload.invitationCode = this.invitationCode;
                }
                const result = await axios.post(`${config.both}?${partUrl}`, postPayload);
                if (result.status === 200) {
                    this.mdlog('ZCY001_21', '注册成功／登录成功', {
                        phone: this.regphoneNum,
                        userId: result.data.userId,
                        type: 'loginReg'
                    });
                    setCookie('pg_uid', `${result.data.userId}`);
                    this.sendMsg({ ...result.data, type: 'login-reg' });
                    this.resetIframe();
                }
            } catch (e) {
                const error = e.response.data.errors? e.response.data.errors[0] : e.response.data;
                // this.$toast(error.message);
                this.$toast('error.message');
                this.mdlog('ZCY001_22', '注册失败／登录失败', {
                    ...error
                });
                this.sendMsg({ ...error, evnetType: 'backendError', errorPlace: 'loginreg' });
            }
        },
        // 点注册后触发
        async register() {
            if (!this.isValid) {
                return;
            }
            if (!this.checkMust()) {
                return;
            }
            this.allBlur();
            // 埋点
            this.mdlog('ZCY001_07', '登录注册点击', {
                phone: this.regphoneNum,
                smsCode: this.smsCode,
                imgCode: this.imgCode,
                type: 'register'
            });
            const wtf = getWTF();
            try {
                let payload;
                if (wtf) {
                    payload = { ...baseParam, md: Medusa.getMd(), wtf };
                } else {
                    payload = { ...baseParam, md: Medusa.getMd() };
                }
                const partUrl = qs.stringify(payload);
                const postPayload = { mobile: rsa.encrypt(this.regphoneNum), verifyCode: this.smsCode };
                if (this.regPass) {
                    postPayload.password = rsa.encrypt(this.regPass);
                }
                if (this.invitationCode && this.invitationCode !== 'undefined') {
                    postPayload.invitationCode = this.invitationCode;
                }
                const result = await axios.post(`${config.reg}?${partUrl}`, postPayload);
                if (result.status === 200) {
                    this.mdlog('ZCY001_21', '注册成功／登录成功', {
                        phone: this.regphoneNum,
                        userId: result.data.userId,
                        type: 'register'
                    });
                    setCookie('pg_uid', `${result.data.userId}`);
                    this.sendMsg({ ...result.data, type: 'register' });
                    this.resetIframe();
                }
            } catch (e) {
                const error = e.response.data.errors? e.response.data.errors[0] : e.response.data;
                this.$toast(error.message);
                this.mdlog('ZCY001_22', '注册失败／登录失败', {
                    ...error
                });
                this.sendMsg({ ...error, evnetType: 'backendError', errorPlace: 'reg', phone: this.regphoneNum, mobile: this.regphoneNum });
            }
        },
        resetAllToFalse() {
            this.loginerror = false;
            this.registerUserError = false;
            this.registerPassError = false;
            this.regVerify = false;
        },
        // 点发送验证码后触发
        async getCode() {
            // 点击之后 一分钟之后才能再点
            if (this.interval > 0 && this.codeIndex) {
                return;
            }
            // 检测手机号
            if (!this.checkMobile(true)) {
                // this.regSmsErrText = '请输入手机号';
                // this.regSmsVerifyError = true;
                this.$toast('请输入正确的手机号');
                // setTimeout(() => {
                //     this.regSmsErrText = '';
                //     this.regSmsVerifyError = false;
                // }, 1000);
                return;
            }
            if (!this.checkPass(true)) {
                this.$toast('请输入6-16位字母数字符号');
                return;
            }

            // 检测验证码
            if (this.imgCode.length !== 4 && this.showImgCode) {
                // this.regPicVerifyError = true;
                this.$toast('请输入正确的图形验证码');
                return;
            }

            this.codeIndex = 0;
            this.interval = 60;
            ++this.codeIndex;
            if (this.codeIndex === 1) {
                try {
                    await this.getSMS();
                } catch (e) {
                    if (e.message === 'return') {
                        this.codeIndex = 0;
                        this.interval = 60;
                        return;
                    }
                }
                const flag = setInterval(() => {
                    const ele = document.querySelector('.sms-wrapper .sendcode');
                    if (this.interval < 2) {
                        clearInterval(flag);
                        this.interval = 60;
                        this.btnColorChange = false;
                        this.btnText = '重新获取';
                        this.getCapcha();
                        this.codeIndex = 0;
                        ele && ele.classList.remove('counting');
                        return;
                    }
                    if (ele && !ele.classList.contains('counting')) {
                        ele.classList.add('counting');
                    }
                    --this.interval;
                    this.btnText = `${this.interval}秒后再获取`;
                    this.btnColorChange = true;
                }, 1000);
            }
        },
        // 手机号检测
        checkMobile(onlycheck) {
            if (!onlycheck) {
                // 埋点
                const phone = this.regphoneNum;
                this.mdlog('ZCY001_02', '输入手机号', {
                    phone,
                });
            }
            if (this.actionType === 'login') {
                return true;
            }
            const regex = /^\d{11}$/;
            // const regex = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(14[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if (!regex.test(this.regphoneNum)) {
                if (!onlycheck || typeof onlycheck === 'object') {
                    // this.registerUserError = true;
                    this.$toast('请输入正确的手机号', 15000);
                }
                this.sendMsg({ eventType: 'inputCheck', errorPlace: 'mobile' });
                return false;
            }
            return true;
        },
        // 密码格式检测
        checkPass(onlycheck) {
            if (this.types.indexOf(1) === -1) return true;
            if (!onlycheck) {
                // 埋点
                this.mdlog('ZCY001_06', '输入密码');
            }
            // this.registerPassError = true;
            if ((this.regPass.length >= 6 && this.regPass.length <= 16)) {
                this.registerPassError = false;
                return true;
            }
            if (typeof onlycheck === 'boolean' && onlycheck) {
                this.registerPassError = false;
                // return false;
            }
            this.sendMsg({ eventType: 'inputCheck', errorPlace: 'password' });
            this.$toast('请输入6-16位的字母数字符号');
            return false;
        },
        resetInput(index) {
            switch (index) {
                case 1:
                    this.registerUserError = false;
                    this.x1 = true;
                    break;
                case 2:
                    this.registerPassError = false;
                    this.x2 = true;
                    break;
                case 3:
                    this.regPicVerifyError = false;
                    this.x3 = true;
                    break;
                case 4:
                    this.regSmsVerifyError = false;
                    this.x4 = true;
                    break;
                case 5:
                    this.loginerror = false;
                    break;
                default:
                    break;
            }
        },
        sendMsg(msg) {
            getHub(this.outerData.id).$emit('message', msg);
            // return window.parent && window.parent.postMessage(msg, '*');
        },
        async getCapcha() {
            try {
                const payload = { ...baseParam, md: Medusa.getMd() };
                const partUrl = qs.stringify(payload);
                const result = await axios.get(`${config.captcha}?${partUrl}`);
                if (result.status !== 200) throw new Error('获取验证码错误');
                this.ticket = result.data.ticket;
                this.imgDataUrl = `data:image/png;base64,${result.data.imageCode}`;
            } catch (e) {
                this.$toast('获取验证码错误');
                const error = e.response.data.errors? e.response.data.errors[0] : e.response.data;
                this.sendMsg({ ...error, eventType: 'backendError', errorPlace: 'capcha' });
            }
        },
        async getSMS() {
            /*
             2017 5-6 新增将图形验证码去掉
             */
            // 埋点
            this.mdlog('ZCY001_04', '获取短信验证码', {
                phone: this.regphoneNum,
            });
            try {
                if (this.showImgCode) {
                    const payload = { ...baseParam, md: encodeURI(Medusa.getMd()) };
                    const partUrl = qs.stringify(payload);
                    const result = await axios.post(`${config.sms}?${partUrl}`, {
                        captchaCode: this.imgCode,
                        mobile: rsa.encrypt(this.regphoneNum),
                        ticket: this.ticket,
                        type: 1,
                    });
                } else {
                    const payload = { ...baseParam, md: encodeURI(Medusa.getMd()) };
                    const partUrl = qs.stringify(payload);
                    const result = await axios.post(`${config.smsverify}?${partUrl}`, {
                        mobile: rsa.encrypt(this.regphoneNum),
                        type: 1,
                    });
                }
            } catch (e) {
                this.mdlog('ZCY001_20', '验证码发送失败', {
                    phone: this.regphoneNum,
                });
                const error = e.response.data.errors? e.response.data.errors[0] : e.response.data;
                this.$toast(error.message);
                if (error.code === 1116) {
                    this.getCapcha();
                    this.showImgCode = true;
                    this.sendMsg({ ...error, eventType: 'needShowImageCode', errorPlace: 'sms' });
                    throw new Error('return');
                }

                this.sendMsg({ ...error, eventType: 'backendError', errorPlace: 'sms' });
                throw new Error('return');
            }
        },
        // 检测必填项
        checkMust() {
            // if (~this.types.indexOf(0) && !this.checkMobile(true)) {
            //     Toast('请正确输入手机号');
            //     return false;
            // }
            if (this.actionType === 'reg') {
                if (~this.types.indexOf(0) && !this.checkMobile(true)) {
                    this.$toast('请正确输入手机号');
                    return false;
                }
            }
            if (~this.types.indexOf(1) && !this.checkPass(true)) {
                this.$toast('请输入长度大于6小于16的密码');
                return false;
            }
            if (~this.types.indexOf(2) && !this.imgCode && this.showImgCode) {
                this.$toast('请输入图形验证码');
                this.sendMsg({ eventType: 'inputCheck', errorPlace: 'imgCode' });
                return false;
            }
            if (~this.types.indexOf(3) && !this.smsCode) {
                this.$toast('请输入短信验证码');
                this.sendMsg({ eventType: 'inputCheck', errorPlace: 'smsCode' });
                return false;
            }
            return true;
        },
        mdlog(event, msg, rqd = {}) {
            // 埋点
            if (!this.service) return;
            this.log.beforeSend(function(data){
                data.content.user['user_id'] = rqd.userId? rqd.userId : '';
                return data;
            })
            // 代码真难看，但是为了兼容没办法
            if (this.actionType === 'both') {
                rqd.type = 'loginReg'
            } else if (this.actionType === 'reg') {
                rqd.type = 'register'
            } else if (this.actionType === 'login') {
                rqd.type = 'login'
            }
            this.log.send('ZCY001', event, {
                content: {
                    events: {
                        msg: msg || '',
                    },
                    retention: {
                        rqd,
                    },
                },
            });
        },
        resetIframe() {
            this.regphoneNum = ''; // 注册用户名
            this.regPass = ''; // 注册密码
            this.imgCode = ''; // 图形验证码
            this.smsCode = ''; // 短信验证码
            this.registerUserError = false;
            this.registerPassError = false;
            this.regPicVerifyError = false;  // 注册图形验证码 是否错误
            this.regSmsVerifyError = false; // 注册短信验证码 是否错误
        },
        reportInput(isCheck) {
            const check = isCheck || false;
            if (check && !this.checkMust()) {
                return;
            }
            this.sendMsg({
                username: this.regphoneNum,
                password: this.regPass,
                imgCode: this.imgCode,
                smsCode: this.smsCode,
                type: 'reportInput',
            });
        },
        watchValue() {
            this.sendMsg({
                username: this.regphoneNum,
                password: this.regPass,
                imgCode: this.imgCode,
                smsCode: this.smsCode,
                showImgCode: this.showImgCode,
                type: 'watch',
            });
        },
        allBlur() {
            if (this.noBlur) return;
            window.focus();
            const inputs = document.getElementsByTagName('input');
            for (let i = 0; i < inputs.length; i++) {
                setTimeout(() => inputs[i] && inputs[i].blur(), 200);
            }
        },
        setParams(params) {
            this.invitationCode = params.invitationcode;
            this.regphoneNum = params.mobile;
        },
        blur1() {
            setTimeout(() => {
                this.x1 = false;
                this.checkMobile(false);
            }, 200);
        },
        blur2() {
            setTimeout(() => {
                this.x2 = false;
                this.checkPass(false);
            }, 200);
        },
        blur3() {
            const phone = this.regphoneNum;
            const imgCode = this.imgCod;
            setTimeout(() => {
                this.x3 = false;
                this.mdlog('ZCY001_05', '输入图形验证码', {
                    phone,
                    imgCode,
                });
            }, 200);
        },
        blur4() {
            const phone = this.regphoneNum;
            const smsCode = this.smsCode;
            setTimeout(() => {
                this.x4 = false;
                this.mdlog('ZCY001_03', '输入短信验证码', {
                    phone,
                    smsCode,
                });
            }, 200);
        },
    },
    computed: {
        x1show() {
            return this.x1 && this.showX && this.regphoneNum.length;
        },
    },
    created() {
        const param = this.outerData;
        baseParam.big_app_id = param.big_app_id || 1;
        baseParam.plat = param.plat || baseParam.plat;
        baseParam.app_id = param.app_id || 111;
        baseParam.channel = param.channel;
        if (baseParam.channel === 'undefined' || !baseParam.channel) {
            this.isValid = false;
            setTimeout(() => {
                this.$toast('请填写渠道号');
            }, 1000);
        }
        baseParam.scenes = param.ispc ? 2 : 0;
        this.showlogo = param.showlogo || false;  // to fix
        this.showtab = param.showtab || false;  // to fix
        this.index = param.index || 0;
        this.showicon = param.showicon && this.showicon;
        this.types = param.types || [0, 1, 2, 3];
        // if (~this.types.indexOf(2)) {
        //     this.getCapcha();
        // }
        this.regphoneNum = `${param.username ? param.username : ''}`;
        this.actionType = param.actiontype || 'reg';
        this.showbutton = param.showbutton || this.showbutton;
        this.service = param.service || this.service;
        this.invitationCode = `${param.invitationcode}` || '';
        this.showX = param.showX || false;
        this.log = param.Log;
        this.noBlur = param.noBlur || false;
        if (this.service) {
            this.log.setMeta({
                service: this.service,
                content: {
                    app: {
                        big_app_id: param.big_app_id,
                        app_id: param.app_id,
                        channel: param.channel,
                    },
                },


            });
        }
        if (this.actionType === 'reg') {
            this.passPlaceHolder = '设置密码(6-16位字母或数字)';
        } else {
            this.passPlaceHolder = '输入密码(6-16位字母或数字)';
        }
        const self = this;
        window.addEventListener('blur', () => {
            setTimeout(() => {
                self.allBlur();
            }, 10);
        });
    },
};
