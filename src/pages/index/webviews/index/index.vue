<template src="./index.html"></template>

<style src="./index.scss" lang="scss"></style>

<script>
    import TabBar from '../../../../components/index/tab-bar/index.vue';
    import RedPackageDialog from '../../../../components/common/red-package-dialog/index.vue';

    export default {
        components: {
            TabBar,
            RedPackageDialog
        },
        data() {
            return {
                currentTab: 0
            };
        },
        created() {
            if (!this.isLogined) {
                this.goLogin();
            }


        },
        mounted() {}
    };
</script>
