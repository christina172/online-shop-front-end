import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import ProductsReducer from 'app/products/store/products.slice';
import AuthReducer from 'app/auth/store/auth.slice';
import CartReducer from 'app/cart/store/cart.slice';
import OrdersReducer from 'app/orders/store/orders.slice';

export const store = configureStore({
  reducer: {
    products: ProductsReducer,
    auth: AuthReducer,
    cart: CartReducer,
    orders: OrdersReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
