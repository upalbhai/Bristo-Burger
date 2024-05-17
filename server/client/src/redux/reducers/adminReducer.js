
import { createReducer } from "@reduxjs/toolkit";

export const adminReducer= createReducer(
    {orders:[],users:[]}, (builder) => {
    builder
      .addCase("getDashboardStatsRequest", (state) => {
        state.loading=true;
      })
      .addCase("getDashboardStatsSuccess", (state,action) => {
        state.loading=false;

        state.usersCount=action.payload.usersCount;
        state.ordersCount=action.payload.ordersCount;
        state.totalIncome=action.payload.totalIncome;
      })
      .addCase("getDashboardStatsFail", (state,action) => {
        state.loading=false;
        state.error=action.payload
      })
      .addCase("getAdminUsersRequest", (state) => {
        state.loading=true;
      })
      .addCase("getAdminUsersSuccess", (state,action) => {
        state.loading=false;

        state.users=action.payload;
      })
      .addCase("getAdminUsersFail", (state,action) => {
        state.loading=false;
        state.error=action.payload
      })
      .addCase("getAdminOrdersRequest", (state) => {
        state.loading=true;
      })
      .addCase("getAdminOrdersSuccess", (state,action) => {
        state.loading=false;

        state.orders=action.payload;

      })
      .addCase("getAdminOrdersFail", (state,action) => {
        state.loading=false;
        state.error=action.payload
      })
      .addCase("processOrderRequest", (state) => {
        state.loading=true;
      })
      .addCase("processOrderSuccess", (state,action) => {
        state.loading=false;

        state.message=action.payload;

      })
      .addCase("processOrderFail", (state,action) => {
        state.loading=false;
        state.error=action.payload
      })
      .addCase("clearMessage",(state)=>{
        state.message=null
    })
    .addCase("clearError",(state)=>{
        state.error=null
    })
})