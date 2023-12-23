import { BaseState } from "types/base-state.type";
import { OrderDto } from "./order-dto.type";

export interface OrdersState extends BaseState {
  orders: OrderDto[];
  pending: {
    orders: boolean;
  };
  errors: {
    orders: string | null;
  }
}