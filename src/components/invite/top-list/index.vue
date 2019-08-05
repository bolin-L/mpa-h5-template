<template src="./index.html"></template>
<style lang="scss" src="./index.scss"></style>

<script>
    import InsuranceGateway from '../../../api/insurance-gateway/api';

    export default {
        components: {},
        data() {
            return {
                list: [],
            };
        },
        methods: {
            getList() {
                InsuranceGateway.getDistributionBestListV1({
                }).then(result => {
                    this.list = result.data;
                }).catch(() => {});
            }
        },
        created() {
            this.getList();
        }
    };
</script>
