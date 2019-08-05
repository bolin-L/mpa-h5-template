<template src="./index.html"></template>
<style lang="scss" src="./index.scss"></style>

<script>
import { Modal as WkModal } from '@u51/week-ui';

export default {
    components: {
        WkModal,
    },
    props: ['modalVisible'],
    data() {
        return {
            imgUrl: 'https://51nbimg.u51.com/cc353a2630d044818458ae5f88d507cf.png',
            textVisible: false,
        };
    },
    methods: {
        switchModal() {
            this.$emit('close');
        },
    },
};
</script>
