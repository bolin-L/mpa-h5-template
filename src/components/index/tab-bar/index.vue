<template src="./index.html"></template>
<style lang="scss" src="./index.scss"></style>

<script>
    import { TabbarItem as WkTabbarItem } from '@u51/week-ui';

    export default {
        name: 'tab-bar',
        components: {
            WkTabbarItem,
        },
        data() {
            return {
                activeAttrs: {
                    color: '#00CCAA',
                    image: 'https://51nbimg.u51.com/640b950eff164d8cae4edc11d5970d17.png',
                },
                images: [
                    'https://51nbimg.u51.com/640b950eff164d8cae4edc11d5970d17.png',
                    'https://51nbimg.u51.com/1c01eae2ce5648818d03b60bbcc91d67.png'
                ],
                current: 0,
                tabs: [
                    {
                        text: '产品',
                        active: true,
                        path: '/',
                        image: 'https://51nbimg.u51.com/46a0eb73f345406887e522c9798a163b.png'
                    },
                    {
                        text: '我的',
                        active: false,
                        path: '/my',
                        image: 'https://51nbimg.u51.com/b123a360a24245ba8db2ffe09ace0972.png'
                    }
                ]
            };
        },
        created() {
            const path = this.$route.path;

            for (let i = 0; i < this.tabs.length; i++) {
                if (this.tabs[i].path === path) {
                    this.current = i;
                }
            }

            this.changeActive();
        },
        methods: {
            setTab(index) {
                if (index === this.current) {
                    return;
                }

                this.current = index;
                this.changeActive();
            },

            changeActive() {
                this.activeAttrs.image = this.images[this.current];
                this.changeCurrentTab(this.current);
                this.$router.push(this.tabs[this.current].path);
            },

            changeCurrentTab(current) {
                for (let i = 0; i < this.tabs.length; i++) {
                    this.tabs[i].active = current === i;
                }
            }
        }
    };
</script>
