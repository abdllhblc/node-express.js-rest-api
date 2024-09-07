const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const db = require("./config/database.js")
const router_auth = require("./routes/auth_routes.js")
const router_post = require("./routes/post_routes.js")

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({limit:"30mb", extended:true}))
app.use(express.urlencoded({limit:"30mb", extended:true}))

app.use("/",router_auth)
app.use("/",router_post)


const PORT = process.env.PORT || 5000
 db()
app.listen(PORT,()=>{
    console.log("server is running on port: 5000")
})