import {useAppSelector} from "hooks";

export const useProductsSelector = () => useAppSelector(state => state.products);
export const useProductSelector = () => useAppSelector(state => state.products.product);
