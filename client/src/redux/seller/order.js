import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// const url = "/api/v1";
// const url = "https://ecom-w0cc.onrender.com/api/v1";
// const url = "http://localhost:9889/api/v2";
const url = "/api/v2";
const sellerOrderSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        orders: [],
        order: null
    },

    extraReducers: (builder) => {
        builder
            .addCase(getSellerAllOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSellerAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload.orders
            })
            .addCase(getSellerAllOrders.rejected, (state, action) => {
                state.loading = false;
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
            }).addCase(updateOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateOrder.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });



    },
});

export default sellerOrderSlice.reducer;


export const getSellerAllOrders = createAsyncThunk(
    "seller/orders",
    async (product, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `${url}/seller/orders`,
                {
                    withCredentials: true,
                }
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


export const orderDetails = createAsyncThunk(
    "/order/details",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${url}/seller/order/${id}`, {
                withCredentials: true,
            });
            return data.order;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


export const updateOrder = createAsyncThunk(
    "/seller/order/update",
    async (order, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(
                `${url}/seller/order/${order.id}`,
                {
                    status: order.status,
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);