import { createAsyncThunk } from "@reduxjs/toolkit";

// ============== Repository ==============
import {repository} from "repository";


export const getUserOrders = createAsyncThunk(
  'orders/getUserOrders',
  async (_, thunkAPI) => {
    try {
      const response = await repository.get('/orders/user');
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message)
    }
  }
);