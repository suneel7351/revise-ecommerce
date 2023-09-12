import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// const url = "https://ecom-w0cc.onrender.com/api/v1";
// const url = "http://localhost:9889/api/v1";
const url = "/api/v1";
const reviewsSlice = createSlice({
  name: "reviewsSlice",
  initialState: {
    reviews: [],
    message: null,
    error: null,
    loading: false,
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
      .addCase(getAllReviews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(getAllReviews.rejected, (state, action) => {
        state.loading = false;
        state.reviews = null;
        state.error = action.payload;
      })
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewsSlice.reducer;
export const { clearError, clearMessage } = reviewsSlice.actions;

export const getAllReviews = createAsyncThunk(
  "/admin/reviews",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${url}/product/review/${id}`, {
        withCredentials: true,
      });
      return data.reviews;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "/admin/review/delete",
  async (ids, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${url}/product/review/${ids.productId}?id=${ids.reviewId}`,
        { withCredentials: true }
      );
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
