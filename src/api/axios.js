import axios from 'axios';

const timeout = 16000;
let stopResponse = false; // 多个请求401时只响应第一个
let ajaxCount = 0;
let timer = null;

const commonResponseHandler = async error => {
    if (!error.config.silent) {
        ajaxCount--;
    }
    if (ajaxCount === 0) {
        console.log('toast close');
    }

    if (!error.response && !error.config) {
        return Promise.reject(error);
    }

    if (error.response.status === 401 && !stopResponse) {
        stopResponse = true;
        location.href = `/insurance-niuyoubao-h5/login.html?redirectUrl=${ location.href }`;
    }
    const response = error.response || {};
    const config = error.config;
    let message = '';
    if (response.data && response.data.errors && response.data.errors[0]) {
        message = response.data.errors[0].message;
    } else if (response.data && response.data.message) {
        message = response.data.message;
    } else {
        message = '服务器开小差啦，请稍后再试';
    }

    // 错误的情况不弹错误提示，自行处理
    if (config.hiddenToast) {
        return Promise.reject({
            status: error.response.status,
            message,
        });
    }
    console.log('toast show');
    return Promise.reject(error);
};

// 认证
const instance = axios.create({
    timeout,
    siren: true
});


// restful 参数替换
instance.interceptors.request.use(config => {
    const reg = /\{(.*?)}/gi;
    const params = config.params || {};
    const restArgs = [];

    config.url = config.url.replace(reg, ($0, $1) => {
        if (params[$1]) {
            restArgs.push($1);

            return params[$1];
        }

        return $0;
    });

    // path 参数替换后是否保留
    if (!config.retain) {
        for (let i = 0; i < restArgs.length; i++) {
            delete params[restArgs[i]];
        }
    }

    return config;
});

// 请求toast控制
instance.interceptors.request.use(config => {
    clearTimeout(timer);

    // 无论如何，toast在16s之后一定会关闭掉
    timer = setTimeout(() => {
        console.log('toast close');
    }, timeout);

    if (!config.silent) {
        ajaxCount++;
        console.log('toast show');
    }

    return config;
});

// 请求返回toast控制
instance.interceptors.response.use(async response => {
    const config = response.config || {};

    if (!config.silent) {
        ajaxCount--;
    }

    if (ajaxCount === 0) {
        console.log('toast close');
    }

    return response;
});

instance.interceptors.response.use(response => (response.data), commonResponseHandler);

module.exports = instance;
