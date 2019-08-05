const ua = window.navigator.userAgent;

export default {
    isIos() {
        return /(iPhone|iPad|iPod|iOS)/ig.test(ua);
    },

    isIphoneX() {
        return /(iPhone|iPad|iPod|iOS)/ig.test(ua) && (window.screen.height >= 812 && window.screen.width >= 375);
    },

    isAndroid() {
        return /(Android)/ig.test(ua);
    }
};
