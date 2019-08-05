<template src="./index.html"></template>
<style lang="scss" src="./index.scss"></style>

<script>
    export default {
        name: 'product-card',
        data() {
            return {
                backMoney: 0
            };
        },
        props: {
            product: {
                tyep: Object,
                default() {
                    return {};
                }
            }
        },
        methods: {
            goDetail() {
                this.goPage('detail', {
                    productId: this.product.id,
                    alias: this.product.alias,
                });
            },

            goSharePage() {
                this.goPage('share', {
                    productId: this.product.id,
                    alias: this.product.alias,
                    productName: this.product.title,
                    productImg: this.product.hotAndListPic
                });
            }
        },
        mounted() {
            this.backMoney = Math.floor(this.product.minPrice * this.product.rate) / 100;
        }
    };
</script>
