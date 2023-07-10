import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = "http://localhost:3001/api/";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchProductStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    fetchProductSuccesfull(state, action) {
      state.loading = false;
      state.products = action.payload.response;
    },
    fetchProductFailiure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchProductStart,
  fetchProductSuccesfull,
  fetchProductFailiure,
} = productsSlice.actions;
export default productsSlice.reducer;

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(fetchProductStart());
    const response = await axios.get(`${url}items`);
    dispatch(fetchProductSuccesfull(response.data));
  } catch (error) {
    dispatch(fetchProductFailiure(error.message));
  }
};
