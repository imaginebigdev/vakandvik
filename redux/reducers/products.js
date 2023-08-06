import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = process.env.NEXT_APP_URL_BACK;
const key_admin = process.env.NEXT_APP_KEY_ADMIN;

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filterProducts: [],
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

    // Create product //
    createProductStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    createProductSuccesfull(state, action) {
      state.loading = false;
    },
    createProductFailiure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Create product //
    // Modify product //
    modifyProductStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    modifyProductSuccesfull(state, action) {
      state.loading = false;
    },
    modifyProductFailiure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Modify product //

    // Modify product //
    deleteProductStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    deleteProductSuccesfull(state, action) {
      state.loading = false;
    },
    deleteProductFailiure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    // Modify product //

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
  createProductStart,
  createProductSuccesfull,
  createProductFailiure,
  modifyProductStart,
  modifyProductSuccesfull,
  modifyProductFailiure,
  deleteProductStart,
  deleteProductSuccesfull,
  deleteProductFailiure,
  filterByCategory,
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

export const modifyProduct = (id, modify) => async (dispatch) => {
  try {
    dispatch(modifyProductStart());
    dispatch(fetchProductStart());
    await axios.put(`${url}products/${id}`, {
      ...modify,
      key_admin: key_admin,
    });
    const response = await axios.get(`${url}products`);
    dispatch(fetchProductSuccesfull(response.data));
    dispatch(modifyProductSuccesfull());
  } catch (error) {
    dispatch(modifyProductFailiure());
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductStart());
    dispatch(fetchProductStart());
    await axios.delete(`${url}products/${id}`, {
      data: { key_admin: key_admin },
    });
    const response = await axios.get(`${url}products`);
    dispatch(fetchProductSuccesfull(response.data));
    dispatch(deleteProductSuccesfull());
  } catch (error) {
    dispatch(deleteProductFailiure());
  }
};

export const createProduct = (body) => async (dispatch) => {
  try {
    dispatch(createProductStart());
    dispatch(fetchProductStart());
    await axios.post(`${url}products`, { ...body, key_admin: key_admin });
    const response = await axios.get(`${url}products`);
    dispatch(fetchProductSuccesfull(response.data));
    dispatch(createProductSuccesfull());
  } catch (error) {
    dispatch(createProductFailiure());
  }
};
