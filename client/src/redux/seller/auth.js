import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// const url = "/api/v1";
// const url = "https://ecom-w0cc.onrender.com/api/v1";
// const url = "http://localhost:9889/api/v2";
const url = "/api/v2";
const userSlice = createSlice({
    name: "user",
    initialState: {
        seller: null,
        loading: false,
        isSeller: false,
        message: null,
        error: null
    },
    reducers: {
        clearMessage(state) {
            state.message = null;
        },
        clearError(state) {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.isSeller = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isSeller = true;
                state.message = action.payload.message;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.isSeller = false;
                state.error = action.payload;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.isSeller = false;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.isSeller = true;
                state.message = action.payload.message;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.isSeller = false;
                state.error = action.payload;
            })
            .addCase(sellerProfile.pending, (state) => {
                state.loading = true;
                state.isSeller = false;
            })
            .addCase(sellerProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.isSeller = true;
                localStorage.setItem("seller", action.payload._id)
                state.seller = action.payload;
            })
            .addCase(sellerProfile.rejected, (state, action) => {
                state.loading = false;
                state.isSeller = false;
                state.error = action.payload;
                state.seller = null;
            })
            .addCase(sellerLogout.pending, (state) => {
                state.loading = true;
            })
            .addCase(sellerLogout.fulfilled, (state, action) => {
                state.loading = false;
                state.isSeller = false;
                state.seller = null;
            })
            .addCase(sellerLogout.rejected, (state, action) => {
                state.loading = false;
            })
            .addCase(otpVerify.pending, (state) => {
                state.loading = true;
            })
            .addCase(otpVerify.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(otpVerify.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(resendOtp.pending, (state) => {
                state.loading = true;
            })
            .addCase(resendOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload;
            })
            .addCase(resendOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;

export const { clearError, clearMessage } = userSlice.actions;
export const login = createAsyncThunk(
    "user/login",
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                `${url}/seller/login`,
                userData,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            return data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const register = createAsyncThunk(
    "user/register",
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                `${url}/seller/register`,
                userData,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            return data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const sellerProfile = createAsyncThunk(
    "seller/profile",
    async (demo, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${url}/seller/profile`, {
                withCredentials: true,
            });
            return data.seller;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const sellerLogout = createAsyncThunk(
    "seller/logout",
    async (demo, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${url}/seller/logout`, {
                withCredentials: true,
            });
            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const otpVerify = createAsyncThunk(
    "user/verify",
    async (otp, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${url}/seller/verify`, { otp }, {
                withCredentials: true,
            });
            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
export const resendOtp = createAsyncThunk(
    "user/resendOtp",
    async (otp, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${url}/seller/resend-otp`, {
                withCredentials: true,
            });
            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);
