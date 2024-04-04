const express = require('express');
const isAuthenticated = require('../middlewares/auth');
const router = express.Router();
const {placeOrder,  getOrderDetails, getMyOrders, getAdminOrders, processOrder, createOrderOnline, paymentVerification} =require('../controllers/order');
const authorisedAdmin = require('../middlewares/authorisedAdmin');
router.post("/createorder",placeOrder);
router.post("/createorderonline",isAuthenticated,createOrderOnline);
router.post("/paymentverification",isAuthenticated,paymentVerification);

router.get("/myorders",isAuthenticated,getMyOrders)

router.get("/order/:id",isAuthenticated,getOrderDetails)
router.get("/admin/orders",isAuthenticated,authorisedAdmin,getAdminOrders)
router.get("/admin/order/:id",isAuthenticated,authorisedAdmin,processOrder)




module.exports = router;