import InsuranceGateway from './api/insurance-gateway/api';


/**
* 账户信息    /v1/distribution/accountInfo
*
*/
InsuranceGateway.getDistributionAccountInfoV1({
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* 动账记录    /v1/distribution/accountRecord
*
*/
InsuranceGateway.getDistributionAccountRecordV1({
    params: {
        year: 'undefined', //year
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* 最佳用户    /v1/distribution/bestList
*
*/
InsuranceGateway.getDistributionBestListV1({
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* 卡列表    /v1/distribution/cardList
*
*/
InsuranceGateway.getDistributionCardListV1({
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* 产品详情    /v1/distribution/detail
*
*/
InsuranceGateway.getDistributionDetailV1({
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* 生效列表    /v1/distribution/effectList
*
*/
InsuranceGateway.getDistributionEffectListV1({
    params: {
        start: 'undefined', //start
        count: 'undefined', //count
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* 获取背景图    /v1/distribution/getBackGroudPicture
*
*/
InsuranceGateway.getDistributionGetBackGroudPictureV1({
    params: {
        productId: 'undefined', //productId
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* 获取微信openId    /v1/distribution/getUserOpenId
*
*/
InsuranceGateway.getDistributionGetUserOpenIdV1({
    params: {
        code: 'undefined', //code
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* 邀请记录    /v1/distribution/invite
*
*/
InsuranceGateway.getDistributionInviteV1({
    params: {
        inviteCode: 'undefined', //inviteCode
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* 用户邀请信息    /v1/distribution/inviteInfo
*
*/
InsuranceGateway.getDistributionInviteInfoV1({
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* 生成二维码    /v1/distribution/qrCode
*
*/
InsuranceGateway.postDistributionQrCodeV1({
    data: {
        req: {
    "bgUrl": "(string) undefined",
    "content": "(string) undefined",
    "size": "(integer) undefined",
    "x": "(integer) undefined",
    "y": "(integer) undefined"
}, //req
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* 推荐产品    /v1/distribution/recommend
*
*/
InsuranceGateway.getDistributionRecommendV1({
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* 产品列表渲染    /v1/distribution/render
*
*/
InsuranceGateway.getDistributionRenderV1({
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* 扫码记录    /v1/distribution/scan
*
*/
InsuranceGateway.getDistributionScanV1({
    params: {
        inviteCode: 'undefined', //inviteCode
        productId: 'undefined', //productId
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* 红包列表    /v1/distribution/ticketList
*
*/
InsuranceGateway.getDistributionTicketListV1({
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* 红包弹窗状态    /v1/distribution/ticketStatus
*
*/
InsuranceGateway.getDistributionTicketStatusV1({
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* 未生效列表    /v1/distribution/uneffectList
*
*/
InsuranceGateway.getDistributionUneffectListV1({
    params: {
        start: 'undefined', //start
        count: 'undefined', //count
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* 未支付列表    /v1/distribution/unpayList
*
*/
InsuranceGateway.getDistributionUnpayListV1({
    params: {
        start: 'undefined', //start
        count: 'undefined', //count
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});

/**
* 提现    /v1/distribution/withdraw
*
*/
InsuranceGateway.postDistributionWithdrawV1({
    data: {
        req: {
    "amount": "(number) undefined",
    "cardId": "(integer) undefined",
    "payAmount": "(number) undefined",
    "userId": "(string) undefined"
}, //req
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});
