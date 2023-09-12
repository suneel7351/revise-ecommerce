import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// const url = "/api/v1";
// const url = "https://ecom-w0cc.onrender.com/api/v1";
// const url = "http://localhost:9889/api/v2";
const url = "/api/v2";
const sellerProductSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        products: [],
        product: [],
        notifications: [],
        unread: null,
        productsCount: null,
        incExp: null,
        yearIncExp: null,
        yearRevenue: null,
        processingCount: null, shippedCount: null, deliveredCount: null, inStock: null, outOfStock: null
    },

    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(getAllProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(getSingleProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload
            })
            .addCase(getSingleProduct.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(updateProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(updateStock.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateStock.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(updateStock.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(productReview.pending, (state) => {
                state.loading = true
            })
            .addCase(productReview.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(productReview.rejected, (state) => {
                state.loading = false
            })
            .addCase(getAllNotifications.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllNotifications.fulfilled, (state, action) => {
                state.loading = false
                state.notifications = action.payload.notifications
                state.unread = action.payload.unreadCount
            })
            .addCase(getAllNotifications.rejected, (state) => {
                state.loading = false
            })
            .addCase(updateNotificationStatus.pending, (state) => {
                state.loading = true
            })
            .addCase(updateNotificationStatus.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(updateNotificationStatus.rejected, (state) => {
                state.loading = false
            })
            .addCase(getAllCountProduct.pending, (state) => {
                state.loading = true
            })
            .addCase(getAllCountProduct.fulfilled, (state, action) => {
                state.loading = false
                state.productsCount = action.payload
            })
            .addCase(getAllCountProduct.rejected, (state) => {
                state.loading = false
            })
            .addCase(getYearWiseIncomeExpenses.pending, (state) => {
                state.loading = true
            })
            .addCase(getYearWiseIncomeExpenses.fulfilled, (state, action) => {
                state.loading = false
                state.yearIncExp = action.payload.yearIncExp
                state.yearRevenue = action.payload.yearRevenue
            })
            .addCase(getYearWiseIncomeExpenses.rejected, (state) => {
                state.loading = false
            })
            .addCase(getOverAllIncomeExpenses.pending, (state) => {
                state.loading = true
            })
            .addCase(getOverAllIncomeExpenses.fulfilled, (state, action) => {
                state.loading = false
                state.incExp = action.payload
            })
            .addCase(getOverAllIncomeExpenses.rejected, (state) => {
                state.loading = false
            })
            .addCase(getnoOfOrderWithStatus.pending, (state) => {
                state.loading = true
            })
            .addCase(getnoOfOrderWithStatus.fulfilled, (state, action) => {
                state.loading = false
                state.processingCount = action.payload.processingCount
                state.deliveredCount = action.payload.deliveredCount
                state.shippedCount = action.payload.shippedCount

            })
            .addCase(getnoOfOrderWithStatus.rejected, (state) => {
                state.loading = false
            })
            .addCase(countStock.pending,(state)=>{
                state.loading=true
            })
            .addCase(countStock.fulfilled,(state,action)=>{
                state.loading=false
                state.inStock=action.payload.inStockCount
                state.outOfStock=action.payload.outOfStockCount
                
            })
            .addCase(countStock.rejected,(state)=>{
                state.loading=false
            })


    },
});

export default sellerProductSlice.reducer;


export const createProduct = createAsyncThunk(
    "seller/product/new",
    async (product, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                `${url}/seller/product/new`,
                product,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );
            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const updateProduct = createAsyncThunk(
    "seller/product/:id",
    async (product, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(
                `${url}/seller/product/${product.id}`,
                product.data,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }
            );
            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const getAllProducts = createAsyncThunk(
    "seller/products",
    async (product, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `${url}/seller/products`,
                {
                    withCredentials: true,
                }
            );
            return data.products;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const getSingleProduct = createAsyncThunk(
    "seller/product/getsingle",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `${url}/seller/product/${id}`,
                {
                    withCredentials: true,
                }
            );
            return data.product;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const deleteProduct = createAsyncThunk(
    "seller/product/delete",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(
                `${url}/seller/product/${id}`,
                {
                    withCredentials: true,
                }
            );
            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const updateStock = createAsyncThunk(
    "seller/product/stock",
    async (product, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(
                `${url}/seller/stock/${product.id}`, {
                stock: product.stock
            },
                {
                    withCredentials: true,
                }
            );
            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }

);


export const productReview = createAsyncThunk(
    "/product/review",
    async (reviewData, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`${url}/product/review`, reviewData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const updateNotificationStatus = createAsyncThunk(
    "/notification",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`${url}/notification/${id}`, {
                withCredentials: true,
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const getAllNotifications = createAsyncThunk(
    "/notifications",
    async (reviewData, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${url}/notifications`, {
                withCredentials: true,
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const getAllCountProduct = createAsyncThunk(
    "/countProduct",
    async (reviewData, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${url}/seller/total-product`, {
                withCredentials: true,
            });
            return data.totalProducts;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    })


export const getOverAllIncomeExpenses = createAsyncThunk(
    "/incExp",
    async (reviewData, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${url}/seller/overall-incExp`, {
                withCredentials: true,
            });
            return data.incExp;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    })
export const getYearWiseIncomeExpenses = createAsyncThunk(
    "/incExp/year",
    async (year, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${url}/seller/year-incExp?year=${year}`, {
                withCredentials: true,
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    })


export const getnoOfOrderWithStatus = createAsyncThunk(
    "/noOfOrderWithStatus",
    async (year, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${url}/seller/noOfOrderWithStatus`, {
                withCredentials: true,
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    })


export const countStock = createAsyncThunk(
    "/count-stock",
    async (year, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${url}/seller/stock-count`, {
                withCredentials: true,
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    })



    


