import {UUIDDto} from "types/uuid-dto.type";

export interface CartItemDto extends UUIDDto  {
  quantity: number;
  price: number | null;
  product: CartItemProductDto;
  orderId: string;
}

export interface CartItemProductDto extends UUIDDto {
  name: string;
  brand: string;
  category: string;
  description: string;
  image: string | null;
  price: number;
  in_stock: number;
}