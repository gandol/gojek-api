const Axios = require("axios").default;
const { config } = require("../config");
const Request = Axios.create({
    baseURL: config.gopay_base_url,
    headers: {
        "Accept": "application/json",
        "X-Appversion": "4.20.1",
        "X-Appid": "com.gojek.app",
        "X-Platform": "Android",
        "X-Uniqueid": "a9fed3daeb8b4945",
        "X-Session-Id": "9b5c66f4-984c-47b1-b785-32a5b4808625",
        "X-Deviceos": "Android,5.1",
        "X-User-Type": "customer",
        "X-Phonemake": "unknown",
        "X-Phonemodel": "generic,Google",
        "X-Pushtokentype": "FCM",
        "User-Uuid": "716285799",
        "Accept-Language": "id-ID",
        "X-User-Locale": "id_ID",
        "X-Location": "0.0,0.0",
        "X-Location-Accuracy": "0.0",
        "Gojek-Country-Code": "ID",
        "Gojek-Service-Area": "14",
        "Gojek-Timezone": "Asia/Jakarta",
        "Content-Type": "application/json; charset=UTF-8",
        "Accept-Encoding": "gzip, deflate",
        "User-Agent": "okhttp/3.12.13",
    }
})

const RequestGojekApi = Axios.create({
    baseURL: config.gojek_base_url,
    headers: {
        "Accept": "application/json",
        "X-Appversion": "4.20.1",
        "X-Appid": "com.gojek.app",
        "X-Platform": "Android",
        "X-Uniqueid": "a9fed3daeb8b4945",
        "X-Session-Id": "9b5c66f4-984c-47b1-b785-32a5b4808625",
        "X-Deviceos": "Android,5.1",
        "X-User-Type": "customer",
        "X-Phonemake": "unknown",
        "X-Phonemodel": "generic,Google",
        "X-Pushtokentype": "FCM",
        "User-Uuid": "716285799",
        "Accept-Language": "id-ID",
        "X-User-Locale": "id_ID",
        "X-Location": "0.0,0.0",
        "X-Location-Accuracy": "0.0",
        "Gojek-Country-Code": "ID",
        "Gojek-Service-Area": "14",
        "Gojek-Timezone": "Asia/Jakarta",
        "Content-Type": "application/json; charset=UTF-8",
        "Accept-Encoding": "gzip, deflate",
        "User-Agent": "okhttp/3.12.13",
    }
})

module.exports = {
    Request,
    RequestGojekApi
}