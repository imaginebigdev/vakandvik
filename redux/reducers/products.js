import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = "http://localhost:3001/api/";

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
      state.products = action.payload.response;
      state.filterProducts = action.payload.response;
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
        return product.categories.some((category) =>
          action.payload.includes(category.id)
        );
      });
      state.filterProducts = filteredProducts;
      state.loading = false;
    },
    filterByCategoryStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    filterByCategorySuccesfull(state, action) {
      state.loading = false;
      state.filterProducts = action.payload.response;
    },
    filterByCategoryFailiure(state, action) {
      state.loading = false;
      state.error = action.payload;
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

    //order by relevant //
    orderByRelevant(state, action) {
      state.loading = true;
      const sortedProducts = [...state.filterProducts].filter(
        (p) => p.is_featured
      );

      state.filterProducts = sortedProducts;
      state.loading = false;
    },
    //order by relevant //

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
