import { BaseState } from "types/base-state.type";
import { CartItemDto } from "./cart-item-dto";

export interface CartState extends BaseState {
  cart: CartItemDto[];
  cartId: string;
  pending: {
    cart: boolean;
  };
  errors: {
    cart: string | null;
  }
}