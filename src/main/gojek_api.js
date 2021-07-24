const { config } = require("../config")
const { RequestGojekApi } = require("../helpers/RequestHandler")

class GojekApi {
    constructor(gojek_token) {
        this.gojek_token = gojek_token
    }
    /**
     * 
     * @returns goclubStatus and rewards
     */
    async goclubStatus() {
        try {
            const { data } = await RequestGojekApi.get("/goclub/v1/membership", {
                headers: {
                    Authorization: `Bearer ${this.gojek_token}`,
                }
            })
            return data?.data
        } catch (error) {
            return false
        }
    }

}

module.exports = GojekApi