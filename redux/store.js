import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./reducers/profile";
import productsReducer from "./reducers/products";
import categorySlice from "./reducers/categories";

export default configureStore({
  reducer: {
    profile: profileReducer,
    categories: categorySlice,
    products: productsReducer,
  },
});
