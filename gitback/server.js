require("dotenv").config()

const express = require("express")
const cors = require("cors")

const paymentRoute = require("./routes/payment")
const whatsappRoute = require("./routes/whatsapp")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/payment", paymentRoute)
app.use("/api/whatsapp", whatsappRoute)

app.get("/", (req,res)=>{
res.send("Backend running")
})

app.listen(process.env.PORT || 3000)