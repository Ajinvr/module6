const express = require('express')
const app = express()

const dotenv = require("dotenv").config()
const cors = require('cors');
const router = require("./routes/mainroute")

const connectdb = require("./db/config/dbconnection")
      connectdb()
const bodyParser = require('body-parser')

const port = process.env.PORT || 4000

app.use(bodyParser.json());
app.use(cors({"Header set Access-Control-Allow-Origin":"*"}))
app.use('/',router)
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.listen(port,()=>{
    console.log(" server started");
})