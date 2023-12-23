import {createSlice} from "@reduxjs/toolkit";

// ============== Types ==============
import { ProductState } from "../types/product-state.type";

// ============== Actions ==============
import { getProduct, getProducts, getProductsByCategory } from "./products.actions";

const initialState:ProductState = {
  products: [],
  product: null,
  pending: {
    products: false,
    product: false
  },
  errors: {
    products: null,
    product: null
  }
}

const productsSlice = createSlice({
  name: 'prodcuts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ============== Get one product ==============
      .addCase(getProduct.pending, (state) => {
        state.pending.product = true;
        state.errors.product = null;
      })
      .addCase(getProduct.fulfilled, (state, { payload }) => {
          state.pending.product = false;
          state.product = payload;
      })
      .addCase(getProduct.rejected, (state, action: any & { payload: any }) => {
          state.pending.product = false;
          state.errors.product = action.payload;
      })
      // ============== Get products ==============
      .addCase(getProducts.pending, (state) => {
          state.pending.products = true;
          state.errors.products = null;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
          state.pending.products = false;
          state.products = payload;
      })
      .addCase(getProducts.rejected, (state, action: any & { payload: any }) => {
          state.pending.products = false;
          state.errors.products = action.payload;
      })
      // ============== Get products by category id ==============
      .addCase(getProductsByCategory.pending, (state) => {
        state.pending.products = true;
        state.errors.products = null;
      })
      .addCase(getProductsByCategory.fulfilled, (state, { payload }) => {
          state.pending.products = false;
          state.products = payload;
      })
      .addCase(getProductsByCategory.rejected, (state, action: any & { payload: any }) => {
          state.pending.products = false;
          state.errors.products = action.payload;
      })
  },
});

export default productsSlice.reducer;