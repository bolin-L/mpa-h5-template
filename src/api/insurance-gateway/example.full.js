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
/*
* 返回结果
{
    "data": {},
    "errorCode": "(string) undefined",
    "errorMsg": "(string) undefined",
    "success": "(boolean) undefined"
}
*/



/**
 * 动账记录    /v1/distribution/accountRecord
 *
 * @params      { Integer  }      year                          year
 */
InsuranceGateway.getDistributionAccountRecordV1({
    params: {
        year: 'undefined',
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});
/*
* 返回结果
{
    "data": {},
    "errorCode": "(string) undefined",
    "errorMsg": "(string) undefined",
    "success": "(boolean) undefined"
}
*/



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
/*
* 返回结果
{
    "data": {},
    "errorCode": "(string) undefined",
    "errorMsg": "(string) undefined",
    "success": "(boolean) undefined"
}
*/



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
/*
* 返回结果
{
    "data": {},
    "errorCode": "(string) undefined",
    "errorMsg": "(string) undefined",
    "success": "(boolean) undefined"
}
*/



/**
 * 产品详情    /v1/distribution/detail
 *
 * @params      { Integer  }      productId                     产品id
 * @params      { Integer  }      fcProductId                   账户产品id
 * @params      { String   }      userId                        用户id
 * @params      { String   }      alias                         产品编号
 */
InsuranceGateway.getDistributionDetailV1({
    params: {
        productId: 'undefined',
        fcProductId: 'undefined',
        userId: 'undefined',
        alias: 'undefined',
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});
/*
* 返回结果
{
    "defaultInsurePeriod": "(string) 默认保障期限",
    "defaultPlanId": "(integer) 默认方案id",
    "defaultPrice": "(integer) 默认价格",
    "defaultPriceId": "(integer) 默认价格Id",
    "discountExtInfo": [],
    "identity": {
        "idCard": "(string) 身份证",
        "name": "(string) 姓名",
        "phone": "(string) 手机号"
    },
    "msg": "(string) 提示",
    "plans": [
        {
            "defaultPrice": {
                "extInfo": [],
                "id": "(integer) id",
                "msg": "(string) 提示",
                "price": "(integer) 价格,单位:分",
                "success": "(boolean) 是否成功"
            },
            "extMap": {},
            "id": "(integer) 主键",
            "installment": "(boolean) 是否分期",
            "insureDuties": [
                {
                    "dutyDesc": "(string) 描述",
                    "price": "(string) 价格",
                    "title": "(string) 标题"
                }
            ],
            "miaoshaPrice": "(integer) 秒杀价",
            "minPrice": "(integer) 最低保费",
            "outProductNo": "(string) 外部产品编号",
            "productId": "(integer) 产品id",
            "social": "(boolean) 有无社保",
            "title": "(string) 标题"
        }
    ],
    "product": {
        "alias": "(string) 别名",
        "claimProcess": "(string) 理赔流程",
        "claincase": "(string) 理赔案例",
        "clauseInterpretation": "(string) 条款解读",
        "countable": "(integer) 投保份数是否可选, 0-否,1-是",
        "descList": [],
        "effectiveDate": "(integer) 生效日期次日或可选, 1-指定生效天数,2-可选",
        "effectiveDayCnt": "(integer) 生效指定天数",
        "extraPriceFactor": [],
        "holderExtInfo": [
            {
                "ext": {},
                "key": "(string) undefined",
                "name": "(string) undefined",
                "placeholder": "(string) undefined",
                "rules": [],
                "type": "(string) undefined",
                "value": []
            }
        ],
        "hotAndListPic": "(string) 热销和列表产品图",
        "id": "(integer) 主键",
        "insType": "(string) 险种",
        "insureFor": [
            {
                "key": "(string) undefined",
                "value": "(string) undefined"
            }
        ],
        "insurePeriodList": [
            {
                "name": "(string) 描述, 1年",
                "value": "(string) 1_y"
            }
        ],
        "insuredExtInfo": [
            {
                "ext": {},
                "key": "(string) undefined",
                "name": "(string) undefined",
                "placeholder": "(string) undefined",
                "rules": [],
                "type": "(string) undefined",
                "value": []
            }
        ],
        "introURLs": "(string) 产品介绍图地址",
        "orgCode": "(string) 机构编码",
        "orgName": "(string) 机构名称",
        "orgPhoneNum": "(string) 机构客服电话",
        "picURLs": "(string) 头图地址",
        "priceFactor": "(string) 定价因子, 逗号隔开",
        "productExtConfigInfo": [
            {
                "key": "(string) undefined",
                "name": "(string) undefined",
                "purpose": "(string) undefined",
                "value": "(string) undefined"
            }
        ],
        "productExtInfo": [
            {
                "key": "(string) undefined",
                "name": "(string) undefined",
                "purpose": "(string) undefined",
                "value": "(string) undefined"
            }
        ],
        "promotionIcon": "(string) 活动图标",
        "promotionText": "(string) 活动文案",
        "qa": "(string) 重点解读",
        "question": "(string) 常见问题",
        "rate": "(string) 返佣比例",
        "recommendPic": "(string) 推荐产品图",
        "smartUnderwriting": "(boolean) 是否需要智能核保",
        "summary": "(string) 副标题",
        "tag": {
            "tagTip": [],
            "tagTitle": "(string) 标签标题"
        },
        "title": "(string) 主标题"
    },
    "saleNum": "(integer) 销售数量",
    "success": "(boolean) 是否成功"
}
*/



/**
 * 生效列表    /v1/distribution/effectList
 *
 * @params      { Integer  }      start                         start
 * @params      { Integer  }      count                         count
 */
InsuranceGateway.getDistributionEffectListV1({
    params: {
        start: 'undefined',
        count: 'undefined',
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});
/*
* 返回结果
{
    "data": {},
    "errorCode": "(string) undefined",
    "errorMsg": "(string) undefined",
    "success": "(boolean) undefined"
}
*/



/**
 * 获取背景图    /v1/distribution/getBackGroudPicture
 *
 * @params      { String   }      productId                     productId
 */
InsuranceGateway.getDistributionGetBackGroudPictureV1({
    params: {
        productId: 'undefined',
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});
/*
* 返回结果
{
    "data": {},
    "errorCode": "(string) undefined",
    "errorMsg": "(string) undefined",
    "success": "(boolean) undefined"
}
*/



/**
 * 获取微信openId    /v1/distribution/getUserOpenId
 *
 * @params      { String   }      code                          code
 */
InsuranceGateway.getDistributionGetUserOpenIdV1({
    params: {
        code: 'undefined',
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});
/*
* 返回结果
{
    "data": {},
    "errorCode": "(string) undefined",
    "errorMsg": "(string) undefined",
    "success": "(boolean) undefined"
}
*/



/**
 * 邀请记录    /v1/distribution/invite
 *
 * @params      { String   }      inviteCode                    inviteCode
 */
InsuranceGateway.getDistributionInviteV1({
    params: {
        inviteCode: 'undefined',
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});
/*
* 返回结果
{
    "data": {},
    "errorCode": "(string) undefined",
    "errorMsg": "(string) undefined",
    "success": "(boolean) undefined"
}
*/



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
/*
* 返回结果
{
    "data": {},
    "errorCode": "(string) undefined",
    "errorMsg": "(string) undefined",
    "success": "(boolean) undefined"
}
*/



/**
 * 生成二维码    /v1/distribution/qrCode
 *
 * @params      { Object   }      req                           req
 */
InsuranceGateway.postDistributionQrCodeV1({
    data: {
        bgUrl: '(string) undefined',
        content: '(string) undefined',
        size: '(integer) undefined',
        x: '(integer) undefined',
        y: '(integer) undefined',
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});
/*
* 返回结果
{
    "message": "(string) undefined",
    "success": "(boolean) undefined",
    "url": "(string) undefined"
}
*/



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
/*
* 返回结果
{
    "banners": [
        {
            "actionType": "(string) 链接跳转方式",
            "linkURL": "(string) 链接地址",
            "name": "(string) 名称",
            "picURL": "(string) 图片地址"
        }
    ],
    "cats": [
        {
            "planeCode": "(string) 版块code",
            "planeName": "(string) 版块名称",
            "products": [
                {
                    "alias": "(string) 别名",
                    "defaultPrice": {
                        "extInfo": [],
                        "id": "(integer) id",
                        "msg": "(string) 提示",
                        "price": "(integer) 价格,单位:分",
                        "success": "(boolean) 是否成功"
                    },
                    "hotAndListPic": "(string) 热销和列表产品图",
                    "id": "(integer) 主键",
                    "insType": "(string) 险种",
                    "installment": "(boolean) 分期",
                    "keywords": [],
                    "listCouponInfo": "(string) 优惠信息",
                    "minPrice": "(string) 最低费用: 100.00 （元起)",
                    "org": "(string) 保险机构",
                    "picURL": "(string) 详情图片",
                    "promotionAmount": "(string) 最大优惠金额",
                    "rate": "(string) 返佣比例",
                    "recommendPic": "(string) 推荐产品图",
                    "saleNum": "(integer) 销售数量",
                    "sort": "(string) 排序分",
                    "title": "(string) 主标题"
                }
            ]
        }
    ],
    "classList": [
        {
            "actionValue": "(string) feed路由Url参数",
            "coverImgs": [],
            "feedId": "(string) feedId",
            "feedType": "(integer) feed类型 1-优惠 2-文章 3-专题 4-卡单元 5-推荐专题入口",
            "operationCfgPreviewMap": {},
            "rankIndex": "(integer) 个性化推荐排序游标",
            "relatedFeedPreviewItems": [
                {
                    "actionValue": "(string) feed路由Url参数",
                    "coverImgs": [],
                    "feedId": "(string) feedId",
                    "feedType": "(integer) feed类型 1-优惠 2-文章 3-专题 4-卡单元 5-推荐专题入口",
                    "operationCfgPreviewMap": {},
                    "rankIndex": "(integer) 个性化推荐排序游标",
                    "relatedFeedPreviewItems": [
                        {
                            "actionValue": "(string) feed路由Url参数",
                            "coverImgs": [],
                            "feedId": "(string) feedId",
                            "feedType": "(integer) feed类型 1-优惠 2-文章 3-专题 4-卡单元 5-推荐专题入口",
                            "operationCfgPreviewMap": {},
                            "rankIndex": "(integer) 个性化推荐排序游标",
                            "relatedFeedPreviewItems": [
                                {
                                    "actionValue": "(string) feed路由Url参数",
                                    "coverImgs": [],
                                    "feedId": "(string) feedId",
                                    "feedType": "(integer) feed类型 1-优惠 2-文章 3-专题 4-卡单元 5-推荐专题入口",
                                    "operationCfgPreviewMap": {},
                                    "rankIndex": "(integer) 个性化推荐排序游标",
                                    "relatedFeedPreviewItems": [
                                        {
                                            "actionValue": "(string) feed路由Url参数",
                                            "coverImgs": [],
                                            "feedId": "(string) feedId",
                                            "feedType": "(integer) feed类型 1-优惠 2-文章 3-专题 4-卡单元 5-推荐专题入口",
                                            "operationCfgPreviewMap": {},
                                            "rankIndex": "(integer) 个性化推荐排序游标",
                                            "relatedFeedPreviewItems": [
                                                {
                                                    "actionValue": "(string) feed路由Url参数",
                                                    "coverImgs": [],
                                                    "feedId": "(string) feedId",
                                                    "feedType": "(integer) feed类型 1-优惠 2-文章 3-专题 4-卡单元 5-推荐专题入口",
                                                    "operationCfgPreviewMap": {},
                                                    "rankIndex": "(integer) 个性化推荐排序游标",
                                                    "relatedFeedPreviewItems": [
                                                        {
                                                            "actionValue": "(string) feed路由Url参数",
                                                            "coverImgs": [],
                                                            "feedId": "(string) feedId",
                                                            "feedType": "(integer) feed类型 1-优惠 2-文章 3-专题 4-卡单元 5-推荐专题入口",
                                                            "operationCfgPreviewMap": {},
                                                            "rankIndex": "(integer) 个性化推荐排序游标",
                                                            "relatedFeedPreviewItems": [
                                                                {
                                                                    "actionValue": "(string) feed路由Url参数",
                                                                    "coverImgs": [],
                                                                    "feedId": "(string) feedId",
                                                                    "feedType": "(integer) feed类型 1-优惠 2-文章 3-专题 4-卡单元 5-推荐专题入口",
                                                                    "operationCfgPreviewMap": {},
                                                                    "rankIndex": "(integer) 个性化推荐排序游标",
                                                                    "relatedFeedPreviewItems": [
                                                                        {
                                                                            "actionValue": "(string) feed路由Url参数",
                                                                            "coverImgs": [],
                                                                            "feedId": "(string) feedId",
                                                                            "feedType": "(integer) feed类型 1-优惠 2-文章 3-专题 4-卡单元 5-推荐专题入口",
                                                                            "operationCfgPreviewMap": {},
                                                                            "rankIndex": "(integer) 个性化推荐排序游标",
                                                                            "relatedFeedPreviewItems": [
                                                                                {
                                                                                    "actionValue": "(string) feed路由Url参数",
                                                                                    "coverImgs": [],
                                                                                    "feedId": "(string) feedId",
                                                                                    "feedType": "(integer) feed类型 1-优惠 2-文章 3-专题 4-卡单元 5-推荐专题入口",
                                                                                    "operationCfgPreviewMap": {},
                                                                                    "rankIndex": "(integer) 个性化推荐排序游标",
                                                                                    "relatedFeedPreviewItems": "#/definitions/feed预览单项",
                                                                                    "routerUrl": "(string) feed路由Url",
                                                                                    "title": "(string) 标题"
                                                                                }
                                                                            ],
                                                                            "routerUrl": "(string) feed路由Url",
                                                                            "title": "(string) 标题"
                                                                        }
                                                                    ],
                                                                    "routerUrl": "(string) feed路由Url",
                                                                    "title": "(string) 标题"
                                                                }
                                                            ],
                                                            "routerUrl": "(string) feed路由Url",
                                                            "title": "(string) 标题"
                                                        }
                                                    ],
                                                    "routerUrl": "(string) feed路由Url",
                                                    "title": "(string) 标题"
                                                }
                                            ],
                                            "routerUrl": "(string) feed路由Url",
                                            "title": "(string) 标题"
                                        }
                                    ],
                                    "routerUrl": "(string) feed路由Url",
                                    "title": "(string) 标题"
                                }
                            ],
                            "routerUrl": "(string) feed路由Url",
                            "title": "(string) 标题"
                        }
                    ],
                    "routerUrl": "(string) feed路由Url",
                    "title": "(string) 标题"
                }
            ],
            "routerUrl": "(string) feed路由Url",
            "title": "(string) 标题"
        }
    ],
    "icons": [
        {
            "actionType": "(string) 链接跳转方式",
            "linkURL": "(string) 链接地址",
            "miniURL": "(string) 小程序链接地址",
            "name": "(string) 名称",
            "picURL": "(string) 图片地址"
        }
    ],
    "msg": "(string) 提示",
    "success": "(boolean) 是否成功"
}
*/



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
/*
* 返回结果
{
    "cats": [
        {
            "insTypeCode": "(string) 险种code",
            "insTypeDesc": "(string) 险种描述",
            "insTypeName": "(string) 险种名称",
            "products": [
                {
                    "alias": "(string) 别名",
                    "defaultPrice": {
                        "extInfo": [],
                        "id": "(integer) id",
                        "msg": "(string) 提示",
                        "price": "(integer) 价格,单位:分",
                        "success": "(boolean) 是否成功"
                    },
                    "hotAndListPic": "(string) 热销和列表产品图",
                    "id": "(integer) 主键",
                    "insType": "(string) 险种",
                    "installment": "(boolean) 分期",
                    "keywords": [],
                    "listCouponInfo": "(string) 优惠信息",
                    "minPrice": "(string) 最低费用: 100.00 （元起)",
                    "org": "(string) 保险机构",
                    "picURL": "(string) 详情图片",
                    "promotionAmount": "(string) 最大优惠金额",
                    "rate": "(string) 返佣比例",
                    "recommendPic": "(string) 推荐产品图",
                    "saleNum": "(integer) 销售数量",
                    "sort": "(string) 排序分",
                    "title": "(string) 主标题"
                }
            ]
        }
    ],
    "msg": "(string) 提示",
    "success": "(boolean) 是否成功"
}
*/



/**
 * 扫码记录    /v1/distribution/scan
 *
 * @params      { String   }      inviteCode                    inviteCode
 * @params      { Integer  }      productId                     productId
 */
InsuranceGateway.getDistributionScanV1({
    params: {
        inviteCode: 'undefined',
        productId: 'undefined',
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});
/*
* 返回结果
{
    "data": {},
    "errorCode": "(string) undefined",
    "errorMsg": "(string) undefined",
    "success": "(boolean) undefined"
}
*/



/**
 * 红包列表    /v1/distribution/ticketList
 *
 * @params      { Integer  }      type                          type
 */
InsuranceGateway.getDistributionTicketListV1({
    params: {
        type: 'undefined',
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});
/*
* 返回结果
{
    "data": {},
    "errorCode": "(string) undefined",
    "errorMsg": "(string) undefined",
    "success": "(boolean) undefined"
}
*/



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
/*
* 返回结果
{
    "data": {},
    "errorCode": "(string) undefined",
    "errorMsg": "(string) undefined",
    "success": "(boolean) undefined"
}
*/



/**
 * 未生效列表    /v1/distribution/uneffectList
 *
 * @params      { Integer  }      start                         start
 * @params      { Integer  }      count                         count
 */
InsuranceGateway.getDistributionUneffectListV1({
    params: {
        start: 'undefined',
        count: 'undefined',
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});
/*
* 返回结果
{
    "data": {},
    "errorCode": "(string) undefined",
    "errorMsg": "(string) undefined",
    "success": "(boolean) undefined"
}
*/



/**
 * 未支付列表    /v1/distribution/unpayList
 *
 * @params      { Integer  }      start                         start
 * @params      { Integer  }      count                         count
 */
InsuranceGateway.getDistributionUnpayListV1({
    params: {
        start: 'undefined',
        count: 'undefined',
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});
/*
* 返回结果
{
    "data": {},
    "errorCode": "(string) undefined",
    "errorMsg": "(string) undefined",
    "success": "(boolean) undefined"
}
*/



/**
 * 提现    /v1/distribution/withdraw
 *
 * @params      { Object   }      req                           req
 */
InsuranceGateway.postDistributionWithdrawV1({
    data: {
        amount: '(number) undefined',
        cardId: '(integer) undefined',
        payAmount: '(number) undefined',
        userId: '(string) undefined',
    },
}).then(result => {
    console.log(result);
}).catch(error => {
    console.log(error);
});
/*
* 返回结果
{
    "data": {},
    "errorCode": "(string) undefined",
    "errorMsg": "(string) undefined",
    "success": "(boolean) undefined"
}
*/



