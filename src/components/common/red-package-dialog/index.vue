<template src="./index.html"></template>
<style lang="scss" src="./index.scss"></style>

<script>
import ModalMask from '../modal-mask/index.vue';
import InsuranceGateway from '../../../api/insurance-gateway/api';

export default {
    components: {
        ModalMask
    },
    data() {
        return {
            showDialog: false
        };
    },
    methods: {
        checkVisited() {
            InsuranceGateway.getDistributionTicketStatusV1({
            }).then(result => {
                this.showDialog = result.data;
            });
        },

        geCouponPage() {
            this.showDialog = false;
            this.goPage('coupon');
        }
    },
    created() {
        this.checkVisited();
    }
};
</script>
