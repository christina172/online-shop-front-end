import { createAsyncThunk } from "@reduxjs/toolkit";

// ============== Repository ==============
import {repository} from "repository";

// ============== Types ==============
import { AddCartItemDto } from "../types/add-cart-item-dto.type";
import { UpdateCartItemDto } from "../types/update-cart-item-dto.type";


export const getUserCart = createAsyncThunk(
  'cart/getUserCart',
  async (_, thunkAPI) => {
    try {
      const response = await repository.get('/orders/cart');
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const updateProductQuantity = createAsyncThunk<UpdateCartItemDto, { dto: UpdateCartItemDto, orderItemId: string }>(
  'cart/updateProductQuantity',
  async ({ dto, orderItemId }, thunkAPI) => {
    try {
      const response = await repository.patch(`/order-items/update_quantity/${orderItemId}`, dto);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message)
    }
  }
);

export const addProductQuantity = createAsyncThunk<UpdateCartItemDto, { dto: UpdateCartItemDto, orderItemId: string }>(
  'cart/addProductQuantity',
  async ({ dto, orderItemId }, thunkAPI) => {
    try {
      const response = await repository.patch(`/order-items/add_quantity/${orderItemId}`, dto);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message)
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async (orderItemId: string , thunkAPI) => {
    try {
      const response = await repository.delete(`/order-items/${orderItemId}`);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message)
    }
  }
);

export const addCartItem = createAsyncThunk<AddCartItemDto, { dto: AddCartItemDto }>(
  'cart/addCartItem',
  async ({ dto }, thunkAPI) => {
    try {
      const response = await repository.post('/order-items', dto);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message)
    }
  }
);

export const placeOrder = createAsyncThunk(
  'cart/placeOrder',
  async (orderItemId: string, thunkAPI) => {
    try {
      const response = await repository.patch(`/orders/${orderItemId}/place_order`);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message)
    }
  }
);
