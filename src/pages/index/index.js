import mixin from '../mixin';
import Vue from 'vue';
import Page from './index.vue';

Vue.mixin(mixin);

// eslint-disable-next-line
const v = new Vue({
    el: '#app',
    render(h) {
        return h(Page);
    },
});
