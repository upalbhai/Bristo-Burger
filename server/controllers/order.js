const wrapAsync = require("../middlewares/wrapAsync");
const Order = require("../models/Order");
const Payment = require("../models/Payment");
const  ErrorHandler  = require("../utils/ErrorHandler");
const crypto = require('crypto')
// const instance =require('../server')

const Razorpay = require('razorpay');
const instance = new Razorpay({ 
    key_id: process.env.RAZORPAY_API_KEY, 
    key_secret:process.env.RAZORPAY_API_secrect 
})
// Now you can use `razorpay` to interact with the Razorpay API

const placeOrder = wrapAsync(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentMethod, itemsPrice, taxPrice, shippingCharges, totalAmount } = req.body;
    const user =req.user._id;
    // console.log("hello")
    const orderOption = {
        shippingInfo,
        orderItems,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
        user,
    };
    
    await Order.create(orderOption);
    res.status(201).json({
        success: true,
        message: "Order placed successfully via cash on delivery"
    });
});
const createOrderOnline = wrapAsync(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentMethod, itemsPrice, taxPrice, shippingCharges, totalAmount } = req.body;
    const user =req.user._id;
    const orderOption = {
        shippingInfo,
        orderItems,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingCharges,
        totalAmount,
        user
    };

    // razorpay
    const options = {
        amount: Number(totalAmount)*100,  // amount in the smallest currency unit
        currency: "INR",
      };
      const order =await instance.orders.create(options)

    await Order.create(orderOption);
    res.status(201).json({
        success: true,
        order,
        orderOption,
    });
    
}); 

// payment verified

const paymentVerification = (wrapAsync(async(req,res,next)=>{
    const {
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
        orderOption,
    } =req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature=crypto
    .createHmac("sha256",process.env.RAZORPAY_API_SECRECT)
    .update(body)
    .digest("hex")

    const isAuthentic = expectedSignature===razorpay_signature;
    // const isAuthentic=true;
    if(isAuthentic){
        const payment = await Payment.create({
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
        })
        await Order.create({
            ...orderOption,paidAt:new Date(Date.now()),
            paymentInfo:payment._id
        });
        res.status(201).json({
            success:true,
            message:`Order placed successfully payment ID: ${payment._id}`
        })
    }
    else{
        return next(new ErrorHandler("Payment failed",400))
    }

}))




const getMyOrders = wrapAsync(async (req, res, next) => {
    const orders = await Order.find({
        user: req.user._id
    }).populate("user", "name");

    res.status(200).json({
        success: true,
        orders
    });
});

const getOrderDetails = wrapAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name");
    // console.log(order);
    if (!order) return next(new ErrorHandler("Invalid Order Id", 404));
    res.status(200).json({
        success: true,
        order,
    });
});


const getAdminOrders = wrapAsync(async (req, res, next) => {
    const orders = await Order.find({}).populate("user", "name");

    res.status(200).json({
        success: true,
        orders,
    });
});
const processOrder = wrapAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.id)
    // console.log(order);
    if (!order) return next(new ErrorHandler("Invalid Order Id", 404));

    if(order.orderStatus==="Preparing"){
        order.orderStatus="Shipped"
    }
    else if (order.orderStatus==="Shipped"){
        order.orderStatus="Delivered";
        order.deleveredAt=new Date(Date.now());
    }
    else if (order.orderStatus==="Delivered")
        return next(new ErrorHandler("Food had been delivered", 400)) 
    
    await order.save();
    res.status(200).json({
        success: true,
        message:"Status updated successfully"
    });
});

module.exports = {
    placeOrder,
    createOrderOnline,
    getMyOrders,
    getOrderDetails,
    getAdminOrders,
    processOrder,
    paymentVerification
};
