import {useAppSelector} from "hooks";

export const useOrdersSelector = () => useAppSelector(state => state.orders);