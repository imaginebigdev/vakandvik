import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = "http://localhost:3001/api/";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: null,
    productsCopy: null,
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
      state.productsCopy = action.payload.response;
    },
    fetchProductFailiure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    filterByCategoryStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    filterByCategorySuccesfull(state, action) {
      state.loading = false;
      state.products = action.payload.response;
    },
    filterByCategoryFailiure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    filterBySearchBar(state, action) {
      state.loading = true;
      if (state.products.length === 0) {
        state.products = [...state.productsCopy];
      }
      if (action.payload === undefined) {
        state.products = [...state.productsCopy];
        return;
      }
      const filterProducts = state.products.filter((product) =>
        product.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.loading = false;
      state.products = filterProducts;
    },
  },
});

export const {
  fetchProductStart,
  fetchProductSuccesfull,
  fetchProductFailiure,
  filterByCategoryStart,
  filterByCategorySuccesfull,
  filterByCategoryFailiure,
  filterBySearchBar,
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
export const fetchProductsByCategory = (idCategory) => async (dispatch) => {
  try {
    dispatch(filterByCategoryStart());
    const response = await axios.get(`${url}items/category/${idCategory}`);
    dispatch(filterByCategorySuccesfull(response.data));
  } catch (error) {
    dispatch(filterByCategoryFailiure(error.message));
  }
};
