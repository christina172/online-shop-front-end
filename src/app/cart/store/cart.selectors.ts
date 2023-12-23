import {useAppSelector} from "hooks";

export const useCartSelector = () => useAppSelector(state => state.cart);