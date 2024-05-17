const express = require("express");
const { connectPassport } = require("./utils/provider.js");
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const errorMiddleWare = require("./middlewares/errorMiddleware.js");
const path = require('path');

require('dotenv').config({
    path: "./config/config.env"
});

const cors = require('cors');
const app = express();

app.use(cookieParser());

// using middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));

<<<<<<< HEAD
=======
app.use(express.static(path.join(__dirname,'/client/dist')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
})

>>>>>>> 3c73c57ab29362e5ee46e984318c59d27da39373
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === "development" ? false : true,
        httpOnly: process.env.NODE_ENV === "development" ? false : true,
        sameSite: process.env.NODE_ENV === "development" ? false : "none"
    }
}));

app.use(passport.initialize());
app.use(passport.session());

connectPassport();

app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

// importing routes
const userRoute = require("./routes/user.js");
const orderRoute = require("./routes/order.js");

app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);

// using cors


app.use(errorMiddleWare); //using the custom error handling middleware

module.exports = app;
