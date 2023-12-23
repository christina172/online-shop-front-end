import {createSlice} from "@reduxjs/toolkit";

// ============== Actions ==============
import {logOutUser, signUpUser, logInUser } from "./auth.actions";

// ============== Types ==============
import { AuthState } from "../types/auth-state.type";

const initialState: AuthState = {
  tokens: null,
  pending: {
    tokens: false
  },
  errors: {
    tokens: null
  }
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ============== Sign Up User ==============
      .addCase(signUpUser.pending, (state) => {
        state.pending.tokens = true;
        state.errors.tokens = null;
      })
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        state.pending.tokens = false;
        state.tokens = payload;
      })
      .addCase(signUpUser.rejected, (state, action: any & { payload: any }) => {
        state.pending.tokens = false;
        state.errors.tokens = action.payload;
      })
      // ============== Log In User ==============
      .addCase(logInUser.pending, (state) => {
        state.pending.tokens = true;
        state.errors.tokens = null;
      })
      .addCase(logInUser.fulfilled, (state, { payload }) => {
        state.pending.tokens = false;
        state.tokens = payload;
        localStorage.setItem("os_access_token", payload.access_token);
        localStorage.setItem("os_refresh_token", payload.refresh_token);
      })
      .addCase(logInUser.rejected, (state, action: any & { payload: any }) => {
        state.pending.tokens = false;
        state.errors.tokens = action.payload;
      })
      // ============== Log Out User ==============
      .addCase(logOutUser.pending, (state) => {
        state.pending.tokens = true;
        state.errors.tokens = null;
      })
      .addCase(logOutUser.fulfilled, (state, {payload}) => {
        state.pending.tokens = false;
        state.tokens = null;
        localStorage.clear();
      })
      .addCase(logOutUser.rejected, (state, action: any & { payload: any }) => {
        state.pending.tokens = false;
        state.errors.tokens = action.payload;
      })
  },
});

export default authSlice.reducer;