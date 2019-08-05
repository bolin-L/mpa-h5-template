import mixin from '../mixin';
import routes from './router';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './webviews/index/index.vue';
import 'root/initialize';

Vue.mixin(mixin);
Vue.use(VueRouter);

const router = new VueRouter({
    routes,
});

// eslint-disable-next-line
const v = new Vue({
    el: '#app',
    router,
    render(h) {
        return h(Index);
    },
});
