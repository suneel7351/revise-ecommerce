import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// const url = "https://ecom-w0cc.onrender.com/api/v1";
const url = "http://localhost:9889/api/v1";

const addTocartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    cartItems: localStorage.getItem("cartItem")
      ? JSON.parse(localStorage.getItem("cartItem"))
      : [],
    shipping: localStorage.getItem("shipping")
      ? JSON.parse(localStorage.getItem("shipping"))
      : {},
  },
  reducers: {
    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
    },
    removeItem(state, action) {
      state.cartItems = state.cartItems.filter((item) => {
        return item.product !== action.payload;
      });
      localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
    },
    addShippingInfo(state, action) {
      state.shipping = action.payload;
      localStorage.setItem("shipping", JSON.stringify(state.shipping));
    },
    addToCart(state, action) {
      const item = action.payload;
      const isExist = state.cartItems.find((i) => i.product === item.product);
      if (isExist) {
        state.cartItems = state.cartItems.map((i) =>
          i.product === isExist.product ? item : i
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      localStorage.setItem("cartItem", JSON.stringify(state.cartItems));
    }
  }
});

export default addTocartSlice.reducer;
export const { removeItem, clearCart, addShippingInfo ,addToCart} =
  addTocartSlice.actions;
