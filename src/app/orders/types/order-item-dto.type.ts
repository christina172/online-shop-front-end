import {UUIDDto} from "types/uuid-dto.type";

export interface OrderItemDto extends UUIDDto  {
  quantity: number;
  price: number;
  product: OrderItemProductDto;
}

export interface OrderItemProductDto extends UUIDDto {
  name: string;
  brand: string;
}