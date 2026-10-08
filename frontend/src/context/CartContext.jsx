import { useCallback, useEffect, useState } from "react";
import CartContext from "./cartContext";
import useAuth from "./useAuth";

import {
  fetchCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
} from "../services/cartApi";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { customer, loader: authLoading } = useAuth();

  const refreshCart = useCallback(async (signal) => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchCart(signal);

      setCartItems(data.cart || []);
    } catch (requestError) {
      if (
        requestError.name === "CanceledError" ||
        requestError.code === "ERR_CANCELED"
      ) {
        return;
      }

      setError(
        requestError.response?.data?.message ||
          "Unable to load cart. Please try again.",
      );
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!customer) {
      queueMicrotask(() => {
        setCartItems([]);
        setLoading(false);
      });
      return;
    }

    const controller = new AbortController();

    queueMicrotask(() => {
      if (!controller.signal.aborted) {
        void refreshCart(controller.signal);
      }
    });

    return () => {
      controller.abort();
    };
  }, [customer, authLoading, refreshCart]);

  const addToCart = async (productId) => {
    const data = await addCartItem(productId);

    setCartItems(data.cart || []);

    return data;
  };

  const updateQuantity = async (productId, quantity) => {
    const data = await updateCartItem(productId, quantity);

    setCartItems(data.cart || []);

    return data;
  };

  const removeFromCart = async (productId) => {
    const data = await removeCartItem(productId);

    setCartItems(data.cart || []);

    return data;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        error,
        refreshCart,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;