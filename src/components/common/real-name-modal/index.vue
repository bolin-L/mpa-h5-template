<template src="./index.html"></template>
<style lang="scss" src="./index.scss"></style>

<script>
import { Modal as WkModal, WkIcon } from '@u51/week-ui';

export default {
    components: {
        WkModal,
        WkIcon
    },
    props: ['show'],
    data() {
        return {
            imgUrl: 'https://51nbimg.u51.com/cc353a2630d044818458ae5f88d507cf.png',
            textVisible: false,
        };
    },
    methods: {
        close() {
            this.$emit('close');
        },

        clickAction() {
            this.close();
            this.goRealName();
        }
    },
};
</script>
