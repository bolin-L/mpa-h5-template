const axios = require('../axios');
const config = require('./config');

module.exports = {
    getDistributionAccountInfoV1: param => axios(Object.assign(config.getDistributionAccountInfoV1, param))
};
