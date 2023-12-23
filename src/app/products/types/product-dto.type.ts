import { UUIDDto } from "types/uuid-dto.type";

export interface ProductDto extends UUIDDto  {
  name: string;
  brand: string;
  category: string;
  description: string;
  image: string | null;
  price: number;
  in_stock: number;
}