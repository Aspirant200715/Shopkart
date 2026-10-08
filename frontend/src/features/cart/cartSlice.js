import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
} from "../../services/cartApi";

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { signal, rejectWithValue }) => {
    try {
      const data = await fetchCart(signal);
      return data.cart || [];
    } catch (error) {
      if (error.name === "CanceledError" || error.code === "ERR_CANCELED") {
        throw error;
      }

      return rejectWithValue(
        error.response?.data?.message ||
          "Unable to load cart. Please try again.",
      );
    }
  },
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId, { rejectWithValue }) => {
    try {
      const data = await addCartItem(productId);
      return data.cart || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to add product to cart.",
      );
    }
  },
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const data = await updateCartItem(productId, quantity);
      return data.cart || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to update quantity.",
      );
    }
  },
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const data = await removeCartItem(productId);
      return data.cart || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to remove item from cart.",
      );
    }
  },
);

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })

      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Unable to load cart.";
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })

      .addCase(updateQuantity.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })

      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
