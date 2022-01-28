const { v4 } = require('uuid');
const { GopayApi, GojekApi } = require('../index');


(async () => {
    let authTOken = "token here";

    // const gopayApi = new GopayApi(authTOken)
    // await gojekApi.setAuthHeader(authTOken)
    let jalan = true
    try {
        const gojekApi = new GojekApi()
        // await gojekApi.setSessionId(v4())
        await gojekApi.setdeviceId("30f68e910b5f69r0")
        let sessionId = v4()
        await gojekApi.setSessionId(sessionId)
        // await gojekApi.getOtpRegist("email","the account name","628377777777")
        // await gojekApi.validateOtpRegist("0000","the token from otp regist")

        const data = await gojekApi.loginRequest("628377777777")//without +62 or 62
        console.log(data);
        // const loginRequest = await gojekApi.getRefreshTOken(dataRefresh)
        // if (loginRequest.access_token) {
        //     console.log(loginRequest.access_token);
        //     jalan = false

        // }
        // console.log(loginRequest);
    } catch (error) {

    }
})()
