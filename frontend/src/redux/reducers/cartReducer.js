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
export const cartReducer = createReducer(initialState, (builder) => {
    builder
      .addCase("cheeseBurgerIncrement", (state) => {
        state.cartItems.cheeseBurger.quantity += 1;
      })
      .addCase("vegCheeseBurgerIncrement", (state) => {
        state.cartItems.vegCheeseBurger.quantity += 1;
      })
      .addCase("burgerWithFriesIncrement", (state) => {
        state.cartItems.burgerWithFries.quantity += 1;
      })
      .addCase("cheeseBurgerDecrement", (state) => {
        state.cartItems.cheeseBurger.quantity -= 1;
      })
      .addCase("vegCheeseBurgerDecrement", (state) => {
        state.cartItems.vegCheeseBurger.quantity -= 1;
      })
      .addCase("burgerWithFriesDecrement", (state) => {
        state.cartItems.burgerWithFries.quantity -= 1;
      })
    // Add more cases to handle other actions
    .addCase("calculatePrice",(state)=>{
        state.subTotal=state.cartItems.cheeseBurger.price*state.cartItems.cheeseBurger.quantity+
        state.cartItems.vegCheeseBurger.price*state.cartItems.vegCheeseBurger.quantity+
        state.cartItems.burgerWithFries.price*state.cartItems.burgerWithFries.quantity;

        state.tax=state.subTotal*0.18;
        state.shippingCharges=state.subTotal>1000?0:150;
        state.total=state.subTotal+state.tax+state.shippingCharges;
    })
    .addCase("emptyState",(state)=>{
        state.cartItems={
            cheeseBurger:{
                quantity:0,
                price:200
            },
            vegCheeseBurger:{
                quantity:0,
                price:250
            },
            burgerWithFries:{
                quantity:0,
                price:400
            }
        },
        state.subTotal=0;
        state.tax=0;
        state.shippingCharges=0;
        state.total=0;
    })
    .addCase("addShippingInfo",(state,action)=>{
      state.shippingInfo={
        hNo:action.payload.hNo,
        phoneNo:action.payload.phoneNo,
        pinCode:action.payload.pinCode,
        city:action.payload.city,
        country:action.payload.country,
        state:action.payload.state
      }
    })
  });
  
  