const express = require("express");
const {connectPassport} = require("./utils/provider.js");
const session = require('express-session')
const passport= require('passport')
const cookieParser = require('cookie-parser');
const errorMiddleWare  = require("./middlewares/errorMiddleware.js");
const port = require('port');
require('dotenv').config({
    path:"./config/config.env"
});
const cors = require('cors')
const app = express();
app.use(cookieParser());
const __dirname = path.resolve();
// using middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended:true,
}))

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:process.env.NODE_ENV==="development"?false:true,
        httpOnly:process.env.NODE_ENV==="development"?false:true,
        sameSite:process.env.NODE_ENV==="development"?false:"none"
    }
}))
app.use(passport.authenticate("session"))
app.use(passport.initialize())
app.use(passport.session())
app.enable("trust proxy")

connectPassport();


app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL,
    methods:["GET","POST","PUT","DELETE"],
}))
// importing  routes 
const userRoute=require("./routes/user.js");
const orderRoute=require("./routes/order.js");

app.use("/api/v1", userRoute)
app.use("/api/v1", orderRoute)

// using cors
app.use(express.static(path.join(__dirname,'/frontend/dist')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'frontend','dist','index.html'));
})



app.use(errorMiddleWare); //using the custom error handling middle ware

module.exports = app;


