<template src="./index.html"></template>
<style lang="scss" src="./index.scss"></style>

<script>
import { Modal as WkModal, WkIcon } from '@u51/week-ui';

export default {
    components: {
        WkModal,
        WkIcon
    },
    props: {
        show: Boolean,
        opacity: {
            type: Number,
            default: 0.5
        }
    },
    data() {
        return {};
    },
    methods: {
        close() {
            this.$emit('close');
        },
    },
};
</script>
