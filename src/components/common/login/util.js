import qs from 'querystring';

export function getQueryString() {
    const result = window.location.href.replace(/#\/\?_mhk_=\w{6}/g, '').match(/[?&][^?&]+=[^?&]+/g);
    const obj = {};
    if (result == null) {
        return '';
    }
    for (let i = 0; i < result.length; i++) {
        let k,v; // eslint-disable-line
        result[i] = result[i].substring(1);
        [k, v] = result[i].split('='); // eslint-disable-line
        if (k === 'invitationcode') {
            obj[k] = v;
            continue; // eslint-disable-line
        }
        obj[k] = isNaN(+v) ? v : +v;
    }

    return obj;
}

export function bindPolyfill() {
    /*eslint-disable*/
    Function.prototype.bind = Function.prototype.bind || function(b){if(typeof this!=="function"){throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");}var a=Array.prototype.slice,f=a.call(arguments,1),e=this,c=function(){},d=function(){return e.apply(this instanceof c?this:b||window,f.concat(a.call(arguments)));};c.prototype=this.prototype;d.prototype=new c();return d;};
}

export const querystring = qs;

export const getWTF = ()=>{
    // added by liuzhongzheng
    let wtf;
    if (~document.cookie.indexOf('wtf=')) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const str = cookies[i].trim();
            if (/^wtf=/.test(str)) {
                wtf = str.replace('wtf=', '');
                break;
            }
        }
    }
    return wtf
}

export function setCookie(name, value, time = 365) {
    try {
        const now = new Date();
        const offset = 8;
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const nd = utc + (3600000 * offset);
        const exp = new Date(nd);
        exp.setTime(exp.getTime() + time * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${escape(value)};path=/;expires=${exp.toGMTString()};`;
        document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()};`;
    } catch (error) {
        
    }
}