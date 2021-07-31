const { Request } = require("../helpers/RequestHandler")
const { v4 } = require('uuid');
const Axios = require('axios').default
class GopayApi {
    constructor(gojek_token) {
        this.gojek_token = gojek_token
        this.setAuthHeader()
    }

    setAuthHeader() {
        Request.defaults.headers.common["Authorization"] = `Bearer ${this.gojek_token}`
        // Request.interceptors.request.use(request => {
        //     console.log(request.headers)
        //     return request
        // })

    }

    /**
     * 
     * @param {string} pin 
     */
    setPinHeader(pin = "") {
        Request.defaults.headers.common["Pin"] = pin
    }

    deletePinHeader() {
        delete Request.defaults.headers.common["Pin"]
    }

    setUuidHeader() {
        Request.defaults.headers.common["Idempotency-Key"] = v4()
    }
    deleteUuidHeader() {
        delete Request.defaults.headers.common["Idempotency-Key"]
    }
    /**
     * 
     * @param {string} qrString the string of qr
     * @returns the return value is success data or boolean false 
     */
    async parseQr(qrString = "") {
        try {
            const dataPost = {
                data: qrString,
                type: "QR_CODE"
            }
            const { data } = await Request.post("/v1/explore", dataPost)
            return data
        } catch (error) {
            return false
        }
    }

    /**
     * 
     * @param {object} dataPost 
     * @returns detail of the transaction
     */
    async paymentQr(dataPost = []) {
        try {
            this.setUuidHeader()
            let { data } = await Request.post("/customers/v1/payments", dataPost);
            this.deleteUuidHeader()
            return data
        } catch (error) {
            console.log(error);
            return false

        }
    }
    /**
     * 
     * @returns gopay data like gopay token,and balance
     */
    async getGopayData() {
        try {
            const { data } = await Request.get("/v1/payment-options/balances")
            let gopayData = [];
            data.data.map(value => {
                if (value.type == "GOPAY_WALLET") {
                    gopayData = value
                }
            })
            return gopayData
        } catch (error) {
            return false
        }
    }
    /**
     * 
     * @param {object} dataPost 
     * @param {string} payment_id 
     * @param {string} pin 
     * @returns result of the transaction
     */
    async payGopay(dataPost = [], payment_id = "", pin = "") {
        try {
            this.setPinHeader(pin)
            const { data } = await Request.patch(`/customers/v1/payments/${payment_id}/capture`, dataPost)
            this.deletePinHeader()
            return data?.data
        } catch (error) {
            if (error?.response?.data?.error?.description) console.log("Error \t", error.response.data.error.description);
            return false
        }
    }
    /**
     * 
     * @param {string} qrString 
     * @returns boolean false or the transaction result
     */
    async createPayment(qrString = "", pin = "") {
        let dataExplore = await this.parseQr(qrString)
        const { token } = await this.getGopayData()
        if (token) {
            const { additional_data, amount, channel_type, checksum, fetch_promotion_details, metadata, order_signature, payee, payment_intent } = dataExplore.data
            const dataPayment = { additional_data, amount, channel_type, checksum, fetch_promotion_details, metadata, order_signature, payee, payment_intent: "DYNAMIC_QR_OFF_US" }
            const dataPaymetInitialize = await this.paymentQr(dataPayment)
            const { payment_id } = dataPaymetInitialize.data
            const dataPaymentFinal = { additional_data, amount, channel_type, checksum, fetch_promotion_details, metadata, order_signature, payee, payment_token: token }
            const payToQris = await this.payGopay(dataPaymentFinal, payment_id, pin)
            if (payToQris) {
                return payToQris;
            }
        }
        return false
    }
    async createPaymentQrisGopay(qrString = "", pin = "") {
        let dataExplore = await this.parseQr(qrString)
        const { token } = await this.getGopayData()
        if (token) {
            const { additional_data, amount, channel_type, checksum, fetch_promotion_details, metadata, order_signature, payee, payment_intent } = dataExplore.data
            const dataPayment = { additional_data, amount, channel_type, checksum, fetch_promotion_details, metadata, order_signature, payee, payment_intent: "DYNAMIC_QR" }
            const dataPaymetInitialize = await this.paymentQr(dataPayment)
            const { payment_id } = dataPaymetInitialize.data
            const applied_promo_code = [
                "rQk2-Ala0nPrR99Wvadm"
            ]
            const dataPaymentFinal = { additional_data, channel_type:"DYNAMIC_QR", checksum, applied_promo_code, metadata, order_signature, payment_token: token }
            const payToQris = await this.payGopay(dataPaymentFinal, payment_id, pin)
            console.log(payToQris);

            if (payToQris) {
                return payToQris;
            }
        }
        return false
    }
    /**
     * 
     * @param {int} page 
     * @param {int} limit 
     * @returns boolean false or transaction history object
     */
    async historyPayment(page = 1, limit = 20) {
        try {
            let url = `/v1/users/order-history?country_code=ID&page=${page}&limit=${limit}`
            const { data } = await Request.get(url)
            return data?.data
        } catch (error) {
            console.log(error);
            return false
        }
    }


}

module.exports = GopayApi