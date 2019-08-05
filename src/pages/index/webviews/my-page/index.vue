<template src="./index.html"></template>
<style lang="scss" src="./index.scss"></style>

<script>
    import { Cell as WkCell, WkDialog } from '@u51/week-ui';
    import RealNameModal from '../../../../components/common/real-name-modal/index.vue';
    import InsuranceGateway from '../../../../api/insurance-gateway/api';

    const { alert: WkAlert } = WkDialog;

    export default {
        name: 'index-page',
        data() {
            return {
                userInfo: {
                    realName: true
                },
                showUngetExplain: false,
                showRealNameModal: false
            };
        },
        components: {
            WkCell,
            RealNameModal,
            WkAlert
        },
        methods: {
            getAccountInfo() {
                InsuranceGateway.getDistributionAccountInfoV1({
                }).then(result => {
                    this.userInfo = result.data || {};
                }).catch(() => {});
            },

            goPageBeforeRealName(pageName) {
                if (this.userInfo.realName) {
                    this.goPage(pageName, {
                        availableMoney: this.userInfo.balance
                    });
                } else {
                    this.showRealNameModal = true;
                }
            }
        },
        created() {
            this.getAccountInfo();
        }
    };
</script>
