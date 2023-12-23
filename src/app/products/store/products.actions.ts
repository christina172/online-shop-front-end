import { createAsyncThunk } from "@reduxjs/toolkit";

// ============== Repository ==============
import {axiosAuth} from "repository";

// ============== Type ==============
import { ProductDto } from "../types/product-dto.type";


export const getProduct = createAsyncThunk<ProductDto, { productId: string }>(
  'products/getProduct',
  async ({ productId }, thunkAPI) => {
    try {
      const response = await axiosAuth.get(`/products/${productId}`);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message)
    }
  }
);

export const getProducts = createAsyncThunk<ProductDto[], { page: number }>(
  'products/getAll',
  async ({ page }, thunkAPI) => {
    try {
      const response = await axiosAuth.get(`/products?page=${page}`);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message)
    }
  }
);

export const getProductsByCategory = createAsyncThunk<ProductDto[], { categoryName: string, page: number }>(
  'products/getProductsByCategory',
  async ({ categoryName, page }, thunkAPI) => {
    try {
      const response = await axiosAuth.get(`/products?category=${categoryName}&page=${page}`);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message)
    }
  }
);