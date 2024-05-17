const app = require("./app.js");
// const Razorpay=require('razorpay')
const  connectDB  = require("./config/database.js");
connectDB();



//razor pay

app.get("/",(req,res)=>{
    res.send("working");
});
app.listen(process.env.PORT,()=>{
    console.log(`server started on ${process.env.PORT}, in ${process.env.NODE_ENV} MODE`);
    console.log("NODE_ENV:", process.env.NODE_ENV);

});

// module.exports = instance;
