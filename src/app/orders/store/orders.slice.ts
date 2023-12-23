import {createSlice} from "@reduxjs/toolkit";

// ============== Types ==============
import {OrdersState} from "../types/orders-state.type";

// ============== Actions ==============
import {getUserOrders} from "./orders.actions";

const initialState: OrdersState = {
  orders: [],
  pending: {
    orders: false,
  },
  errors: {
    orders: null,
  }
}

const userOrdersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ============== Get user orders ==============
      .addCase(getUserOrders.pending, (state) => {
        state.pending.orders = true;
        state.errors.orders = null;
      })
      .addCase(getUserOrders.fulfilled, (state, { payload }) => {
        state.pending.orders = false;
        state.orders = payload;
      })
      .addCase(getUserOrders.rejected, (state, action: any & { payload: any }) => {
        state.pending.orders = false;
        state.errors.orders = action.payload;
      })
  }
});

export default userOrdersSlice.reducer;