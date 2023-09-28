import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
// const url = "https://ecom-w0cc.onrender.com/api/v1";
// const url = "http://localhost:9889/api/v1";
const url = "/api/v1";

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

    wishlist: localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : [], // Add wishlist state
    compareProducts: localStorage.getItem("compareProducts")
      ? JSON.parse(localStorage.getItem("compareProducts"))
      : [],
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
    },


    addToWishlist(state, action) {
      console.log(action);
      const product = action.payload;
      let updatedWishlist = state.wishlist || [];

      const isAdded = updatedWishlist.some((item) => item._id === product._id);

      if (!isAdded) {
        updatedWishlist.push(product);
      } else {
         updatedWishlist = updatedWishlist.filter((item) => item._id !== product._id);
      }

      state.wishlist = updatedWishlist;
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    },

    addToCompare(state, action) {

      console.log(action);
      const product = action.payload;
      const storedProducts = state.compareProducts || [];

      const productIndex = storedProducts.findIndex((p) => p._id === product._id);

      if (productIndex !== -1) {
        storedProducts.splice(productIndex, 1);
      } else {
        if (storedProducts.length < 4) {
          storedProducts.push(product);
        } else {
         toast.error("Atmost 4 product can be added for compare at a time.");
        }
      }

      state.compareProducts = storedProducts;
      localStorage.setItem("compareProducts", JSON.stringify(storedProducts));
    },

  }
});

export default addTocartSlice.reducer;
export const { removeItem, clearCart, addShippingInfo, addToCart,addToCompare,addToWishlist } =
  addTocartSlice.actions;
