const Axios = require("axios").default;
const { v4 } = require('uuid');
const { config } = require("../config");
const Request = Axios.create({
    baseURL: config.gopay_base_url,
    headers: {
        "Accept": "application/json",
        "X-Session-Id": "dac51abf-b314-482e-b34a-0a5deb52aeee",
        "X-Uniqueid": "7c975b83-fe0a-4318-9fef-ffb2d7545d71",
        "X-Appversion": "4.20.1",
        "X-Appid": "com.gojek.app",
        "X-Platform": "Android",
        "X-Deviceos": "Android,5.1",
        "X-User-Type": "customer",
        "X-Phonemake": "unknown",
        "X-Phonemodel": "generic,Google",
        "X-Pushtokentype": "FCM",
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
        "X-Session-Id": "dac51abf-b314-482e-b34a-0a5deb52aeee",
        "X-Uniqueid": "7c975b83-fe0a-4318-9fef-ffb2d7545d71",
        "X-Appversion": "4.20.1",
        "X-Appid": "com.gojek.app",
        "X-Platform": "Android",
        "X-Deviceos": "Android,5.1",
        "X-User-Type": "customer",
        "X-Phonemake": "unknown",
        "X-Phonemodel": "generic,Google",
        "X-Pushtokentype": "FCM",
        "Accept-Language": "id-ID",
        "X-User-Locale": "id_ID",
        "X-Location": "-7,9980622,112,61416445",
        "X-Location-Accuracy": "0.0",
        "Gojek-Country-Code": "ID",
        "Gojek-Service-Area": "14",
        "Gojek-Timezone": "Asia/Jakarta",
        "Content-Type": "application/json; charset=UTF-8",
        "Accept-Encoding": "gzip, deflate",
        "User-Agent": "okhttp/3.12.13",
    }
})
const RequestGojekId = Axios.create({
    baseURL: config.goid_base_url,
    headers: {
        "Accept": "application/json",
        "X-Session-Id": "dac51abf-b314-482e-b34a-0a5deb52aeee",
        "X-Uniqueid": "7c975b83-fe0a-4318-9fef-ffb2d7545d71",
        "X-Appversion": "4.24.2",
        "X-Appid": "com.gojek.app",
        "X-Platform": "Android",
        "X-Deviceos": "Android,5.1",
        "X-User-Type": "customer",
        "X-Phonemake": "unknown",
        "X-Phonemodel": "generic,Google",
        "X-Pushtokentype": "FCM",
        "Accept-Language": "id-ID",
        "X-User-Locale": "id_ID",
        "X-Location": "-7,9980622,112,61416445",
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
    RequestGojekApi,
    RequestGojekId
}