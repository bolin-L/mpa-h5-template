<template>
    <div id="login-el" class="login-el"></div>
</template>
<script>
    // 在 Web 中注入全局 PG 函数
    import '@u51/pg';
    import Vue from 'vue';
    import U51Login from './index';

    export default {
        data() {
            return {
                config: {
                    onloginReg: data => {
                        this.$emit('success', data);
                    },
                    onerror: data => {
                        this.$emit('error', data);
                    },
                },
            };
        },
        props: {
            loginConfig: {
                type: Object,
                default: {},
            },
        },
        methods: {
            genLoginComponent() {
                this.loginIns = new U51Login(Vue, (window.PG || {}).Log, '#login-el', Object.assign(this.config, this.loginConfig));
            },
            loginReg() {
                this.loginIns.loginReg();
            },
            register() {
                this.loginIns.register();
            },
        },
        mounted() {
            this.genLoginComponent();
        },
    };
</script>