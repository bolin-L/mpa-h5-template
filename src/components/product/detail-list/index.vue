<template src="./index.html">
    
</template>

<style lang="scss" scoped src="./index.scss">
    
</style>

<script type="text/javascript">
    import qs from 'qs-url';

    export default {
        components: {},
        props: {
            list: {
                type: Array,
                default() {
                    return [];
                }
            },
            maxCount: {
                type: [String, Number],
                default: 4
            },
            moreLink: {
                type: String,
                default: ''
            },
            planId: {
                type: [String, Number]
            },
            noFirstPadding: {
                type: Boolean,
                default: false
            }
        },
        mounted() {},
        methods: {
            goMore() {
                if (qs.getQuery('productId')) {
                    this.sendLog('product_detail', 'details');
                } else {
                    this.sendLog('order_details', 'detail');
                }

                this.$router.push(qs.addQuery({ planId: this.planId }, this.moreLink));
            }
        },
    };
</script>
