const { v4 } = require("uuid")
const { config } = require("../config")
const { RequestGojekApi, RequestGojekId } = require("../helpers/RequestHandler")

class GojekApi {
    constructor() {
        this.session_id = ""
        this.deviceId = ""
        RequestGojekApi.interceptors.request.use(request => {
            console.log(request.headers)
            return request
        })
        RequestGojekId.interceptors.request.use(request => {
            return request
        })
    }

    async setAuthHeader(gojek_token = "") {
        if (gojek_token) {
            this.gojek_token = gojek_token
            RequestGojekApi.defaults.headers.common["Authorization"] = `Bearer ${gojek_token}`
        }
    }

    /**
     * @param {string} session_id generate from uuid v4
     */

    async setSessionId(session_id = "") {
        if (session_id) {
            RequestGojekApi.defaults.headers.common["X-Session-Id"] = session_id
            this.session_id = session_id
        }
    }

    /**
     * 
     * @param {string} deviceId set the device id of the client
     */
    async setdeviceId(deviceId = "") {
        if (deviceId) {
            RequestGojekApi.defaults.headers.common["X-Uniqueid"] = deviceId
            this.deviceId = deviceId
        }
    }

    /**
     * 
     * @param {string} email 
     * @param {string} name 
     * @param {string} phone 
     * @returns 
     */
    async getOtpRegist(email = "", name = "", phone = "") {
        let dataPost = {
            email,
            name,
            phone,
            signed_up_country: "ID"
        }
        try {
            const { data } = await RequestGojekApi.post("/v5/customers", dataPost)
            const returnData = { ...data?.data, deviceId: this.deviceId, session_id: this.session_id }
            return returnData
        } catch (error) {
            console.log(error.response.data);
            return false;
        }
    }

    /**
     * 
     * @param {int} otp 
     * @param {string} otp_token 
     * @returns 
     */
    async validateOtpRegist(otp="", otp_token = "") {
        let dataPost = {
            client_name: "gojek:consumer:app",
            client_secret: config.client_secret,
            data: {
                otp:otp.toString(),
                otp_token
            }
        }
        try {
            const { data } = await RequestGojekApi.post("/v5/customers/phone/verify", dataPost)
            return data?.data
        } catch (error) {
            return error.response.data
        }
    }

    /**
     * 
     * @param {string} phone_number without 0 like 857755****** or etc
     * @returns 
     */
    async loginRequest(phone_number = "") {
        RequestGojekId.defaults.headers.common["X-Session-Id"] = this.session_id
        RequestGojekId.defaults.headers.common["X-Uniqueid"] = this.deviceId
        let dataPost = {
            client_id: "gojek:consumer:app",
            client_secret: config.client_secret,
            country_code: "+62",
            magic_link_ref: v4(),
            phone_number
        }
        try {
            const { data } = await RequestGojekId.post("/goid/login/request", dataPost)
            return data
        } catch (error) {
            return error.response.data
        }
    }

    /**
     * 
     * @param {string} otp_token otp token from loginRequest
     * @param {string} otp_code otp from gojek
     * @returns json
     */
    async getAuthTokenFromOtp(otp_token = "", otp_code = "") {
        let dataPost = {
            client_name: "gojek:consumer:app",
            client_secret: config.client_secret,
            data: {
                otp_token,
                otp: otp_code
            },
            grant_type: "otp",
        }
        try {
            const { data } = await RequestGojekId.post("/goid/token", dataPost)
            return data
        } catch (error) {
            return false
        }
    }

    /**
     * 
     * @param {string} refresh_token 
     * @returns the new auth token and new refresh token
     */
    async getRefreshTOken(refresh_token = "") {
        RequestGojekId.defaults.headers.common["X-Session-Id"] = this.session_id
        RequestGojekId.defaults.headers.common["X-Uniqueid"] = this.deviceId
        // RequestGojekId.defaults.headers.common["Authorization"] = `Bearer ${this.gojek_token}`

        let dataPost = {
            client_id: "gojek:consumer:app",
            client_secret: config.client_secret,
            data: {
                refresh_token
            },
            grant_type: "refresh_token",
            scopes: []
        }
        try {
            const { data } = await RequestGojekId.post("/goid/token", dataPost)
            return data
        } catch (error) {
            return error.response.data
        }
    }

    /**
     * 
     * method for join goclub
     */
    async joinGoclub() {
        try {
            const { data } = await RequestGojekApi.post("/goclub/v1/members")
            return data?.data
        } catch (error) {
            return false
        }
    }

    /**
     * 
     * @returns goclubStatus and rewards
     */
    async goclubStatus() {
        try {
            const { data } = await RequestGojekApi.get("/goclub/v1/membership")
            return data?.data
        } catch (error) {
            return false
        }
    }

    /**
     * 
     * @param {integer} net_spend 
     * @returns 
     */
    async estimateExp(net_spend = 0) {
        try {
            const dataPost = {
                transactions: [
                    {
                        net_spend,
                        payment_type: "GOPAY_WALLET",
                        service_type: 99
                    }
                ]
            }
            const { data } = await RequestGojekApi.post("/goclub/v1/estimate-xp", dataPost)
            return data?.data.estimations[0].nudges[0]

        } catch (error) {
            return false
        }
    }
    async getTreasure() {
        try {
            const { data } = await RequestGojekApi.get("/goclub/v1/landing-page")
            return data?.data?.current_tier?.treasure_cards
        } catch (error) {
            return false
        }
    }

    /**
     * 
     * @param {string} id_treasure 
     * @returns 
     */
    async getVoucherForClaim(id_treasure = "") {
        try {
            const { data } = await RequestGojekApi.get(`/goclub/v1/user-claims/${id_treasure}`)
            return data.data
        } catch (error) {
            return false;
        }
    }


    /**
     * 
     * @param {string} id_treasure 
     * @param {string} select_benefit 
     * @returns 
     */
    async claimGoclubTreasure(id_treasure = "", select_benefit = "") {
        try {
            const dataPost = { select_benefit }
            const { data } = await RequestGojekApi.patch(`/goclub/v1/user-claims/${id_treasure}`, dataPost)
            return data?.data
        } catch (error) {
            return false
        }
    }

    /**
     * 
     * @returns profile of the user
     */
    async getProfileData() {
        try {
            const { data } = await RequestGojekApi.get("/gojek/v2/customer")
            return data?.customer
        } catch (error) {
            console.log(error.response.data);
            return false
        }
    }

    /**
     * 
     * @param {int} page 
     * @param {int} limit 
     * @returns voucher list 
     */
    async getVoucherData(page = 1, limit = 200) {
        try {
            const { data } = await RequestGojekApi.get(`/gopoints/v3/wallet/vouchers?limit=${limit}&page=${page}`)
            return data
        } catch (error) {
            return false
        }
    }

    /**
     * 
     * @param {string} promo_code 
     * @returns success or false
     */
    async submitPromo(promo_code = "") {
        try {
            let dataPost = {
                promo_code
            }
            const { data } = await RequestGojekApi.post("/go-promotions/v1/promotions/enrollments", dataPost)
            return data
        } catch (error) {
            return false
        }
    }

    /**
     * 
     * @returns list of completed history
     */
    async getCompletedorderHistory() {
        try {
            const { data } = await RequestGojekApi.get("/v1/bookings/completed")
            return data?.data
        } catch (error) {
            return false
        }
    }
    /**
     * 
     * @param {string} orderNo 
     * @returns 
     */
    async getDetailOrder(orderNo = "") {
        try {
            const { data } = await RequestGojekApi.get(`/v1/bookings/${orderNo}/detail`)
            return data?.data
        } catch (error) {
            return false
        }
    }

    /**
     * 
     * @param {string} order_id 
     * @param {int} service_type 
     * @param {string} comment 
     * @returns true or false
     */
    async giveFeedback(order_id = "", service_type = "", comment = "") {
        let dataPost = {
            activity_source: 2,
            comment,
            order_id,
            rating: 5,
            reason: [],
            service_type,
            tip_amount: 0
        }
        try {
            await RequestGojekApi.post("/v4/feedbacks", dataPost)
            return true
        } catch (error) {
            return false
        }
    }



}

module.exports = GojekApi