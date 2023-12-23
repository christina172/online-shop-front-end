import {useAppSelector} from "hooks";

export const useAuthSelector = () => useAppSelector(state => state.auth);