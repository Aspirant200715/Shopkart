import { useEffect } from "react";
import { useDispatch } from "react-redux";

import useAuth from "../../context/useAuth";
import { getCart, clearCart } from "./cartSlice";

function CartInitializer({ children }) {
  const dispatch = useDispatch();

  const { customer, loader: authLoading } = useAuth();

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!customer) {
      dispatch(clearCart());
      return;
    }

    dispatch(getCart());
  }, [customer, authLoading, dispatch]);

  return children;
}

export default CartInitializer;
