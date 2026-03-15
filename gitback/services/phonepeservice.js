const axios = require("axios")
const crypto = require("crypto")
const { v4: uuid } = require("uuid")

exports.createPayment = async(amount)=>{

const transactionId = uuid()

const payload = {

merchantId:process.env.PHONEPE_MERCHANT_ID,
merchantTransactionId:transactionId,
amount:amount*100,
redirectUrl:process.env.REDIRECT_URL,
paymentInstrument:{ type:"UPI_INTENT" }

}

const base64 = Buffer.from(JSON.stringify(payload)).toString("base64")

const checksum = crypto
.createHash("sha256")
.update(base64 + "/pg/v1/pay" + process.env.SALT_KEY)
.digest("hex")

const response = await axios.post(
"https://api.phonepe.com/apis/hermes/pg/v1/pay",
{ request: base64 },
{ headers:{ "X-VERIFY": checksum } }
)

return response.data
}