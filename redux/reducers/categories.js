import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = "http://localhost:3001/api/";

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
      state.categories = action.payload.response;
    },
    fetchCategoryFailiure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCategoryStart,
  fetchCategorySuccesfull,
  fetchCategoryFailiure,
} = categorySlice.actions;
export default categorySlice.reducer;

export const fetchCategories = () => async (dispatch) => {
  try {
    dispatch(fetchCategoryStart());
    const response = await axios.get(`${url}category`);
    dispatch(fetchCategorySuccesfull(response.data));
  } catch (error) {
    dispatch(fetchCategoryFailiure(error.message));
  }
};
