const express = require("express")
const axios = require("axios")

const router = express.Router()

router.post("/send", async(req,res)=>{

const {phone,message} = req.body

await axios.post(

`https://graph.facebook.com/v18.0/${process.env.EICSQ2PLCYW7K1}/messages`,

{
messaging_product:"whatsapp",
to:phone,
type:"text",
text:{body:message}
},

{
headers:{
Authorization:`Bearer ${process.env.WHATSAPP_TOKEN}`
}
}

)

res.json({status:"sent"})

})

module.exports = router
