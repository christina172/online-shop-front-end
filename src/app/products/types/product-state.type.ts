import { BaseState } from "types/base-state.type";
import { ProductDto } from "./product-dto.type";

export interface ProductState extends BaseState {
  products: ProductDto[];
  product: ProductDto | null;
  pending: {
    products: boolean;
    product: boolean;
  };
  errors: {
    products: string | null;
    product: string | null;
  }
}