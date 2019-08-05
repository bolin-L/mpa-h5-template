/* eslint-disable */
import rsa from '@u51/rsa/rsa-lite';
import getHub from './event-hub';
import Login from './login.vue';
import { bindPolyfill } from './util';

bindPolyfill();

let id = 0;


const script = document.createElement('script');

if (~location.host.indexOf('u51')) {
    script.src = '//web.u51.com/channel-transfer/0.1.1/web.js';
} else {
    script.src = '//web.u51.com/channel-transfer/0.1.1/web-cors.js';
}

script.async = true;
try {
    document.body.appendChild(script);
} catch (e) {

}
class U51Login {
    constructor(Vue={}, Log={}, loginId, params = {}) {
        U51Login.Vue = Vue;
        const self = this;
        this.id = id++;
        this.loginId = loginId;
        this.params = params;
        this.onresize = params.onresize;
        this.onregister = params.onregister;
        this.onlogin = params.onlogin;
        this.onloginReg = params.onloginReg;
        this.onerror = params.onerror;
        this.onreportInput = params.onreportInput;
        this.onWatch = params.onWatch;
        this.Log = Log;
        const vm = new Vue({
            el: this.loginId,
            render(h) {
                return h(Login, {
                    props: {
                        outerData: { id: self.id, Log: self.Log, ...self.params },
                    },
                });
            },
        });
        getHub(this.id).$on('message', data => {
            if (data.type && data.type === 'register') {
                this.onregister && this.onregister(data);
            } else if (data.type && data.type === 'login') {
                this.onlogin && this.onlogin(data);
            } else if (data.type && data.type === 'login-reg') {
                this.onloginReg && this.onloginReg(data);
            } else if (data.eventType && data.eventType === 'needShowImageCode') {
                this.onresize && this.onresize(data);
            } else if (data.type && data.type === 'reportInput') {
                this.onreportInput && this.onreportInput(data);
            } else if (data.type && data.type === 'watch') {
                this.onWatch && this.onWatch(data);
            } else {
                this.onerror && this.onerror(data);
            }
        });
        return vm.$children[0];
    }
}

U51Login.rsalite = rsa;

export default U51Login;
