const app = require("./app.js");
// const Razorpay=require('razorpay')
const  connectDB  = require("./config/database.js");
connectDB();
const express = require('express');
const path = require('path')
app.use(express.static(path.join(__dirname,'/client/dist')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
})
//razor pay

app.get("/",(req,res)=>{
    res.send("working");
});
app.listen(process.env.PORT,()=>{
    console.log(`server started on ${process.env.PORT}, in ${process.env.NODE_ENV} MODE`);
    console.log("NODE_ENV:", process.env.NODE_ENV);

});

// module.exports = instance;
