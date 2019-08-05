import Vue from 'vue';
import mixin from '../mixin';
import Page from './index.vue';

Vue.mixin(mixin);

// eslint-disable-next-line
const v = new Vue({
  el: '#app',
  render(h) {
    return h(Page);
  },
});
