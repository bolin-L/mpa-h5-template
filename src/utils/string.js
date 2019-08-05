export default {
    trim(value, all = true) {
        let result = `${value}`;
        result = result.replace(/(^\s*)|(\s*$)/g, '');
        if (all) {
            result = result.replace(/\s|\t/g, '');
        }
        return result;
    },
};