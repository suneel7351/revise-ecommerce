import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// const url = "https://ecom-w0cc.onrender.com/api/v1";
// const url = "http://localhost:9889/api/v2"
const url = "/api/v2";
const reviewsSlice = createSlice({
  name: "seller-review",
  initialState: {
    reviews: [],
    loading: false,
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
      })
      .addCase(deleteReview.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default reviewsSlice.reducer;

export const getAllReviews = createAsyncThunk(
  "/seller/reviews",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${url}/seller/product/review/${id}`, {
        withCredentials: true,
      });
      return data.reviews;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteReview = createAsyncThunk(
  "/seller/review/delete",
  async (ids, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${url}/seller/product/review/${ids.productId}?id=${ids.reviewId}`,
        { withCredentials: true }
      );
      return data.message;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
