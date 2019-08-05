<template src="./index.html"></template>
<style lang="scss" src="./index.scss"></style>

<script>
    import { WkSwiper, WkIndicator } from '@u51/week-ui';
    import ProductCard from '../../../../components/common/product-card/index.vue';
    import InsuranceGateway from '../../../../api/insurance-gateway/api';

    export default {
        name: 'index-page',
        components: {
            WkSwiper,
            WkIndicator,
            ProductCard
        },
        data() {
            return {
                productList: [
                    {
                        id: 123,
                        title: '驾考无忧（全国版）',
                        orgName: '众安保险',
                        descList: ['保额最高可达10万', '储蓄卡|信用卡|网银|手机银行'],
                        price: 320,
                        rate: '15',
                        hotAndListPic: 'http://stable.sfs-gateway.51.env/sfs-gateway/api/v1/download/649a3fe7c7414b09a9f0f345bdfdec8d4ca3'
                    },
                    {
                        id: 123,
                        title: '驾考无忧（全国版）',
                        orgName: '众安保险',
                        descList: ['保额最高可达10万', '储蓄卡|信用卡|网银|手机银行'],
                        price: 320,
                        rate: '15',
                        hotAndListPic: 'http://stable.sfs-gateway.51.env/sfs-gateway/api/v1/download/649a3fe7c7414b09a9f0f345bdfdec8d4ca3'
                    }
                ],
                banners: []
            };
        },
        methods: {
            getProductList() {
                InsuranceGateway.getDistributionRenderV1({
                }).then(result => {
                    this.productList = result.cats || [];
                }).catch(() => {
                    this.productList || [];
                });
            },

            bannerLink(img) {
                if (img.linkURL) {
                    location.href = img.linkURL;
                }
            },

            getBanners() {
                InsuranceGateway.getDistributionRecommendV1({
                }).then(result => {
                    this.banners = result.banners || [];
                }).catch(() => {
                    this.banners = [];
                });
            }
        },
        created() {
            this.getBanners();
            this.getProductList();
        }
    };
</script>
