<template src="./index.html"></template>
<style lang="scss" src="./index.scss"></style>

<script>
    import { Button as Btn, Toast } from '@u51/week-ui';
    import timeUtil from '../../../utils/time';

    export default {
        components: {
            Btn,
        },
        props: {
            data: {
                type: Object,
                default() {
                    return {
                        bottomTips: [],
                    };
                }
            },
        },
        data() {
            return {

            };
        },
        computed: {
            statusIcon() {
                const { state } = this.data;

                return state >= 0 ? 'https://pic.51zhangdan.com/u51/storage/03/0de28a96-5252-4d3a-a641-5653b7762ce3.png' : 'https://pic.51zhangdan.com/u51/storage/95/9f77d720-916f-5f02-4f08-7b734e268085.png';
            },

            buttonStatus() {
                return ['已过期', '去使用', '生效中', '已使用'][this.data.state + 1];
            },

            timeTip() {
                return timeUtil.dateFormat(new Date(this.data.invalidTime), 'yyyy-mm-dd过期');
            }
        },
        created() {

        },
        methods: {
            amountRender(amount) {
                const l = amount + '';
                if (l.indexOf('.') < 0) {
                    return l;
                }
                return (amount + '').replace(/0+?$/, "").replace(/[.]$/, "");
            },
        },
    }

</script>
