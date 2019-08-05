module.exports = {
    output: './src/api',
    cookie: 'JSESSIONID=F61BA0BEC67974A6B8EECADB12145DDB; a628e5a8-ee4a-4968-8ef4-e394d014f260=e3c7dcf5-6ad2-4225-8664-f5261aff837c',
    ignore: {
        headers: ['userId', 'Authorization']
    },
    apis: [
        {
            swagger: 'http://popup.insurance-gateway.51.env/swagger-ui.html',
            controllers: [
                '分销相关api'
            ]
        },
        {
            swagger: 'http://stable.usercenter-gateway.51.env/swagger-ui.html',
            controllers: [
                'web-weixin-controller',
                {
                    controller: 'web-cookie-controller',
                    apis: [
                        '/usercenter-gateway/api/v2/web/cookie/validate'
                    ]
                }
            ]
        },
    ]
};
