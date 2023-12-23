import {createSlice} from "@reduxjs/toolkit";

// ============== Types ==============
import {CartState} from "../types/cart-state.type";
import { CartItemDto } from "../types/cart-item-dto";

// ============== Actions ==============
import {
  getUserCart, 
  addCartItem, 
  addProductQuantity,
  updateProductQuantity, 
  deleteCartItem,
  placeOrder
} from "./cart.actions";

const initialState: CartState = {
  cart: [],
  cartId: '',
  pending: {
    cart: false,
  },
  errors: {
    cart: null,
  }
}


const userCartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ============== Get user cart ==============
      .addCase(getUserCart.pending, (state) => {
        state.pending.cart = true;
        state.errors.cart = null;
      })
      .addCase(getUserCart.fulfilled, (state, { payload }) => {
        state.pending.cart = false;
        state.cartId = payload.id;
        state.cart = payload.order_items;
      })
      .addCase(getUserCart.rejected, (state, action: any & { payload: any }) => {
        state.pending.cart = false;
        state.errors.cart = action.payload;
      })
      // ============== Add cart item ==============
      .addCase(addCartItem.pending, (state) => {
        state.pending.cart = true;
        state.errors.cart = null;
      })
      .addCase(addCartItem.fulfilled, (state, action: any & { payload: CartItemDto }) => {
        state.pending.cart = false;
        state.cart = state.cart.concat(action.payload);
      })
      .addCase(addCartItem.rejected, (state, action: any & { payload: any }) => {
        state.pending.cart = false;
        state.errors.cart = action.payload;
      })
      // ============== Add product quantity ==============
      .addCase(addProductQuantity.pending, (state) => {
        state.pending.cart = true;
        state.errors.cart = null;
      })
      .addCase(addProductQuantity.fulfilled, (state, action: any & { payload: CartItemDto }) => {
        state.pending.cart = false;
        state.cart = state.cart.map(item =>{
          if (item.id == action.payload.id) {
            return {
              ...item,
              quantity: action.payload.quantity
            }
          }
          return item;
          });
      })
      .addCase(addProductQuantity.rejected, (state, action: any & { payload: any }) => {
        state.pending.cart = false;
        state.errors.cart = action.payload;
      })
      // ============== Update product quantity ==============
      .addCase(updateProductQuantity.pending, (state) => {
        state.pending.cart = true;
        state.errors.cart = null;
      })
      .addCase(updateProductQuantity.fulfilled, (state, action: any & { payload: CartItemDto }) => {
        state.pending.cart = false;
        state.cart = state.cart.map(item =>{
          if (item.id == action.payload.id) {
            return {
              ...item,
              quantity: action.payload.quantity
            }
          }
          return item;
          });
      })
      .addCase(updateProductQuantity.rejected, (state, action: any & { payload: any }) => {
        state.pending.cart = false;
        state.errors.cart = action.payload;
      })
      // ============== Delete cart item ==============
      .addCase(deleteCartItem.pending, (state) => {
        state.pending.cart = true;
        state.errors.cart = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action: any & { payload: CartItemDto }) => {
        state.pending.cart = false;
        state.cart = state.cart?.filter(item =>item.id!==action.payload.id);
      })
      .addCase(deleteCartItem.rejected, (state, action: any & { payload: any }) => {
        state.pending.cart = false;
        state.errors.cart = action.payload;
      })
      // ============== Place an order ==============
      .addCase(placeOrder.pending, (state) => {
        state.pending.cart = true;
        state.errors.cart = null;
      })
      .addCase(placeOrder.fulfilled, (state, { payload }) => {
        state.pending.cart = false;
        state.cart = [];
        state.cartId = '';
      })
      .addCase(placeOrder.rejected, (state, action: any & { payload: any }) => {
        state.pending.cart = false;
        state.errors.cart = action.payload;
      })
  }
});

export default userCartSlice.reducer;