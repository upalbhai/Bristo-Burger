import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null
};

export const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("loadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("loadUserSuccess", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null; // Clear any previous errors
    })
    .addCase("loadUserFail", (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    .addCase("logoutRequest", (state) => {
      state.loading = true;
    })
    .addCase("logoutSuccess", (state) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null; // Clear any previous errors
    })
    .addCase("logoutFail", (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    })
    .addCase("clearError",(state)=>{
        state.error=null;
    })
    .addCase("clearMessage",(state)=>{
        state.message=null;
    })
});
