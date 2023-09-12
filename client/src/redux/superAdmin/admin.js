import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// const url = "/api/v1";
// const url = "https://ecom-w0cc.onrender.com/api/v1";
// const url = "http://localhost:9889/api/v3";
const url = "/api/v3";
const superAdminSlice = createSlice({
    name: "super-admin",
    initialState: {
        loading: false,
        isAdmin: null,
        admin: null,
        categories:null,
        category:null,
        fields:null
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.isAdmin = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAdmin = true
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
            }).addCase(adminLogout.pending, (state) => {
                state.loading = true;
            })
            .addCase(adminLogout.fulfilled, (state, action) => {
                state.loading = false;
                state.isAdmin = false
            })
            .addCase(adminLogout.rejected, (state, action) => {
                state.loading = false;
                state.isAdmin = true
            })
            .addCase(adminProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(adminProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.isAdmin = true
                state.admin = action.payload
            })
            .addCase(adminProfile.rejected, (state, action) => {
                state.loading = false;
                state.admin = null
            })
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCategory.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(createCategory.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCategory.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(updateCategory.rejected, (state) => {
                state.loading = false;
            })



            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCategory.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteCategory.rejected, (state) => {
                state.loading = false;
            })


            .addCase(getSingleCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSingleCategory.fulfilled, (state,action) => {
                state.loading = false;
                state.category=action.payload
            })
            .addCase(getSingleCategory.rejected, (state) => {
                state.loading = false;
            })

            .addCase(getAllCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCategories.fulfilled, (state,action) => {
                state.loading = false;
                state.categories=action.payload
            })
            .addCase(getAllCategories.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getAllCategoriesName.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCategoriesName.fulfilled, (state,action) => {
                state.loading = false;
                state.categories=action.payload
            })
            .addCase(getAllCategoriesName.rejected, (state) => {
                state.loading = false;
            })



            .addCase(getAllFieldsName.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllFieldsName.fulfilled, (state,action) => {
                state.loading = false;
                state.fields=action.payload
            })
            .addCase(getAllFieldsName.rejected, (state) => {
                state.loading = false;
            })
            

    },
});

export default superAdminSlice.reducer;


export const login = createAsyncThunk(
    "admin/login",
    async (userData, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                `${url}/admin/login`,
                userData,
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


export const adminLogout = createAsyncThunk(
    "admin/logout",
    async (demo, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${url}/admin/logout`, {
                withCredentials: true,
            });
            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


export const adminProfile = createAsyncThunk(
    "admin/me",
    async (demo, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${url}/admin/me`, {
                withCredentials: true,
            });
            return data.admin;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);





export const createCategory = createAsyncThunk(
    "admin/category/new",
    async (info, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${url}/admin/category/new`, info, {
                withCredentials: true,
            });
            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);




export const getAllCategories = createAsyncThunk(
    "admin/category/all",
    async (info, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${url}/admin/categories`, {
                withCredentials: true,
            });
            return data.categories;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


export const deleteCategory = createAsyncThunk(
    "admin/category/delete",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.delete(`${url}/admin/category/${id}`, {
                withCredentials: true,
            });
            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


export const updateCategory = createAsyncThunk(
    "admin/category/update",
    async (info, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`${url}/admin/category/${info.id}`, info.data, {
                withCredentials: true,
            });
            return data.message;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);



export const getSingleCategory = createAsyncThunk(
    "admin/category/single",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${url}/admin/category/${id}`, {
                withCredentials: true,
            });
            return data.category;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


export const getAllCategoriesName = createAsyncThunk(
    "admin/category/names",
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${url}/admin/categories-name`, {
                withCredentials: true,
            });
            return data.names;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


export const getAllFieldsName = createAsyncThunk(
    "admin/fields/name",
    async (name, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${url}/admin/fields-name/${name}`, {
                withCredentials: true,
            });
            return data.fields;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);