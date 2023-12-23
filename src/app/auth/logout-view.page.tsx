import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ============== Redux ==============
import { useAppDispatch } from "hooks";
import { useAuthSelector } from "./store/auth.selectors";
import { logOutUser } from "./store/auth.actions";


const LogoutPageView = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {tokens} = useAuthSelector();

  useEffect(() => {
    dispatch(logOutUser());
  }, [dispatch])

  useEffect(() => {
    if (tokens === null)
      navigate('/', { replace: true });
  }, [tokens])

  return(<></>);
}

export default LogoutPageView;

