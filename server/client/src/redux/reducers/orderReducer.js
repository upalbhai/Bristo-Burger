
import { createReducer } from "@reduxjs/toolkit";


const initialState={
    cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : {
        cheeseBurger: {
          quantity: 0,
          price: 200,
        },
        vegCheeseBurger: {
          quantity: 0,
          price: 500,
        },
        burgerWithFries: {
          quantity: 0,
          price: 1800,
        },
      },
      subTotal: localStorage.getItem("cartPrices")
      ? JSON.parse(localStorage.getItem("cartPrices")).subTotal
      : 0,
    tax: localStorage.getItem("cartPrices")
      ? JSON.parse(localStorage.getItem("cartPrices")).tax
      : 0,
    shippingCharges: localStorage.getItem("cartPrices")
      ? JSON.parse(localStorage.getItem("cartPrices")).shippingCharges
      : 0,
    total: localStorage.getItem("cartPrices")
      ? JSON.parse(localStorage.getItem("cartPrices")).total
      : 0,
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  }

export const orderReducer= createReducer(initialState, (builder)=>{
    builder
    .addCase("createOrderRequest",(state)=>{
        state.loading=true
    })
    .addCase("createOrderSuccess",(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    })
    .addCase("createOrderFail",(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })
    .addCase("paymentVerificationRequest",(state)=>{
        state.loading=true
    })
    .addCase("paymentVerificationSuccess",(state,action)=>{
        state.loading=false;
        state.message=action.payload;
    })
    .addCase("paymentVerificationFail",(state,action)=>{
        state.loading=false;
        state.error=action.payload;
    })
    .addCase("clearMessage",(state)=>{
        state.message=null
    })
    .addCase("clearError",(state)=>{
        state.error=null
    })
  })

  export const ordersReducer= createReducer(
    {orders:[]},(builder)=>{
        builder
        .addCase("getMyOrdersRequest",(state)=>{
            state.loading=true
        })
        .addCase("getMyOrdersSuccess",(state,action)=>{
            state.loading=false;
            state.orders=action.payload;
        })
        .addCase("getMyOrdersFail",(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        })
        .addCase("getOrderDetailsRequest",(state)=>{
            state.loading=true
        })
        .addCase("getOrderDetailsSuccess",(state,action)=>{
            state.loading=false;
            state.order=action.payload;
        })
        .addCase("getOrderDetailsFail",(state,action)=>{
            state.loading=false;
            state.error=action.payloadl;
        })
    }
  )