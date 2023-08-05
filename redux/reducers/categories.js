import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = process.env.NEXT_APP_URL_BACK;
const key_admin = process.env.NEXT_APP_KEY_ADMIN;

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchCategoryStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    fetchCategorySuccesfull(state, action) {
      state.loading = false;
      state.categories = action.payload;
    },
    fetchCategoryFailiure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    createCategoryStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    createCategorySuccesfull(state, action) {
      state.loading = false;
    },
    createCategoryFailiure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteCategoryStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    deleteCategorySuccesfull(state, action) {
      state.loading = false;
    },
    deleteCategoryFailiure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCategoryStart,
  fetchCategorySuccesfull,
  fetchCategoryFailiure,
  createCategoryStart,
  createCategorySuccesfull,
  createCategoryFailiure,
  deleteCategoryStart,
  deleteCategorySuccesfull,
  deleteCategoryFailiure,
} = categorySlice.actions;
export default categorySlice.reducer;

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch(fetchCategoryStart());
    const response = await axios.get(`${url}categories`);
    dispatch(fetchCategorySuccesfull(response.data));
  } catch (error) {
    dispatch(fetchCategoryFailiure(error.message));
  }
};

export const createCategories = (body) => async (dispatch) => {
  try {
    dispatch(fetchCategoryStart());
    dispatch(createCategoryStart());
    await axios.post(`${url}categories`, { ...body, key_admin });
    const response = await axios.get(`${url}categories`);
    dispatch(fetchCategorySuccesfull(response.data));
    dispatch(createCategorySuccesfull());
  } catch (error) {
    dispatch(createCategoryFailiure(error.message));
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch(fetchCategoryStart());
    dispatch(deleteCategoryStart());
    console.log(key_admin);
    await axios.delete(`${url}categories/${id}`, {
      data: { key_admin: key_admin },
    });
    const response = await axios.get(`${url}categories`);
    dispatch(fetchCategorySuccesfull(response.data));
    dispatch(deleteCategorySuccesfull());
  } catch (error) {
    dispatch(deleteCategoryFailiure(error.message));
  }
};
