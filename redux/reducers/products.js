import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = process.env.NEXT_APP_URL_BACK;

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: null,
    filterProducts: null,
    loading: false,
    error: null,
  },
  reducers: {
    // General GET //
    fetchProductStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    fetchProductSuccesfull(state, action) {
      state.loading = false;
      state.products = action.payload;
      state.filterProducts = action.payload;
    },
    fetchProductFailiure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // General GET //

    // Filter by category //

    filterByCategory(state, action) {
      state.loading = true;
      if (action.payload?.length === 0) {
        state.filterProducts = [...state.products];
        state.loading = false;

        return;
      }
      const filteredProducts = state.products.filter((product) => {
        return action.payload.some(
          (categoryId) => Number(categoryId) === product.categoryId
        );
      });
      state.filterProducts = filteredProducts;
      state.loading = false;
    },

    // Filter by category //

    // Order by price//
    orderByPriceASC(state, action) {
      state.loading = true;
      const sortedProducts = [...state.filterProducts].sort(
        (a, b) => b.price - a.price
      );
      state.filterProducts = sortedProducts;
      state.loading = false;
    },
    orderByPriceDESC(state, action) {
      state.loading = true;
      const sortedProducts = [...state.filterProducts].sort(
        (a, b) => a.price - b.price
      );
      state.filterProducts = sortedProducts;
      state.loading = false;
    },
    // order by price //

    // SearchBar //
    filterBySearchBar(state, action) {
      state.loading = true;

      const filter = state.products.filter((product) =>
        product.name.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.loading = false;
      state.filterProducts = filter;
    },
    // SearchBar //

    // filter by price //
    filterByPrice(state, action) {
      state.loading = true;
      const filterPrice = state.filterProducts?.filter(
        (p) => p.price < action.payload
      );
      state.filterProducts = filterPrice;
      state.loading = false;
    },

    // filter by price //

    // Clean Filters //
    cleanFilters(state, action) {
      state.loading = true;
      state.filterProducts = state.products;
      state.loading = false;
    },
    // Clean Filters //
  },
});

export const {
  fetchProductStart,
  fetchProductSuccesfull,
  fetchProductFailiure,
  filterByCategory,
  filterByCategoryStart,
  filterByCategorySuccesfull,
  filterByCategoryFailiure,
  filterBySearchBar,
  filterByPrice,
  orderByPriceASC,
  orderByPriceDESC,
  orderByRelevant,
  cleanFilters,
} = productsSlice.actions;
export default productsSlice.reducer;

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(fetchProductStart());
    const response = await axios.get(`${url}products`);
    dispatch(fetchProductSuccesfull(response.data));
  } catch (error) {
    dispatch(fetchProductFailiure(error.message));
  }
};
