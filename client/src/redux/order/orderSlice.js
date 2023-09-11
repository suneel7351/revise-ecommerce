import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// const url = "/api/v1";
// const url = "https://ecom-w0cc.onrender.com/api/v1";
const url="http://localhost:9889/api/v1"
const orderSlice = createSlice({
  name: "order/new",
  initialState: {
    loading: false,
    error: null,
    data: {},
    orders: [],
    order: {},
  },
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getAllMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(orderDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(orderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
export const { clearError } = orderSlice.actions;
export const createOrder = createAsyncThunk(
  "/order/new",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${url}/order/new`, orderData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      return data.order;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getAllMyOrders = createAsyncThunk(
  "/order/me",
  async (x, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${url}/order/me`, {
        withCredentials: true,
      });
      return data.orders;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const orderDetails = createAsyncThunk(
  "/order/details",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${url}/order/${id}`, {
        withCredentials: true,
      });
      return data.order;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
