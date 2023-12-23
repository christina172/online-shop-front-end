import {UUIDDto} from "types/uuid-dto.type";
import {OrderItemDto} from "app/orders/types/order-item-dto.type";
import { Status } from "../enums/status.enum";

export interface OrderDto extends UUIDDto  {
  status: Status;
  order_total: number | null;
  order_items: OrderItemDto[];
}