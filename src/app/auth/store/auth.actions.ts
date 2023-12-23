import {createAsyncThunk} from "@reduxjs/toolkit";

// ============== Repositories ==============
import {repository, axiosAuth} from "repository";

// ============== Types ==============
import { AuthDto } from "../types/auth-dto.type";
import { SignupDto } from "../types/signup-dto.type";
import { LoginDto } from "../types/login-dto.type";

export const signUpUser = createAsyncThunk<AuthDto, {dto: SignupDto}>(
  'auth/sign_up',
  async ({dto}, thunkAPI) => {
    try{
      const response = await axiosAuth.post("users",dto);
      return response.data;
    } catch (e: any) {
      if (e.response.data.message == "Unique constraint failed.") {
        return  thunkAPI.rejectWithValue("This username is already in use. Please, choose another one.")
      }
      return  thunkAPI.rejectWithValue(e.response.data.message)
    }
  }
);

export const logInUser = createAsyncThunk<AuthDto, {dto: LoginDto}>(
  'auth/login',
  async ({dto}, thunkAPI) => {
    try{
      const response = await axiosAuth.post("auth/login", dto);
      return response.data;
    } catch (e: any) {
      return  thunkAPI.rejectWithValue(e.response.data.message);
    }
  }
);

export const logOutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try{
      const response = await repository.get("auth/logout");
      return response.data;
    } catch (e: any) {
      return  thunkAPI.rejectWithValue(e.response.data.message)
    }
  }
);