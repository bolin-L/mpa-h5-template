const axios = require('../axios');
const config = require('./config');

module.exports = {
    getDistributionAccountInfoV1: param => axios(Object.assign(config.getDistributionAccountInfoV1, param)),
    getDistributionAccountRecordV1: param => axios(Object.assign(config.getDistributionAccountRecordV1, param)),
    getDistributionBestListV1: param => axios(Object.assign(config.getDistributionBestListV1, param)),
    getDistributionCardListV1: param => axios(Object.assign(config.getDistributionCardListV1, param)),
    getDistributionDetailV1: param => axios(Object.assign(config.getDistributionDetailV1, param)),
    getDistributionEffectListV1: param => axios(Object.assign(config.getDistributionEffectListV1, param)),
    getDistributionGetBackGroudPictureV1: param => axios(Object.assign(config.getDistributionGetBackGroudPictureV1, param)),
    getDistributionGetUserOpenIdV1: param => axios(Object.assign(config.getDistributionGetUserOpenIdV1, param)),
    getDistributionInviteV1: param => axios(Object.assign(config.getDistributionInviteV1, param)),
    getDistributionInviteInfoV1: param => axios(Object.assign(config.getDistributionInviteInfoV1, param)),
    postDistributionQrCodeV1: param => axios(Object.assign(config.postDistributionQrCodeV1, param)),
    getDistributionRecommendV1: param => axios(Object.assign(config.getDistributionRecommendV1, param)),
    getDistributionRenderV1: param => axios(Object.assign(config.getDistributionRenderV1, param)),
    getDistributionScanV1: param => axios(Object.assign(config.getDistributionScanV1, param)),
    getDistributionTicketListV1: param => axios(Object.assign(config.getDistributionTicketListV1, param)),
    getDistributionTicketStatusV1: param => axios(Object.assign(config.getDistributionTicketStatusV1, param)),
    getDistributionUneffectListV1: param => axios(Object.assign(config.getDistributionUneffectListV1, param)),
    getDistributionUnpayListV1: param => axios(Object.assign(config.getDistributionUnpayListV1, param)),
    postDistributionWithdrawV1: param => axios(Object.assign(config.postDistributionWithdrawV1, param)),
};
