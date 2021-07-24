const {GopayApi,GojekApi} = require('../index');


(async () => {
    let authTOken = "token_here";

    const gopayApi = new GopayApi(authTOken)
    const gojekApi = new GojekApi(authTOken)
    const dataResult = await gopayApi.createPayment("qrisStringHere","pinHere")
})()