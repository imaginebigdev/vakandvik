import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/products";
import categorySlice from "./reducers/categories";
import cartReducer from "./reducers/cart";

export default configureStore({
  reducer: {
    cart: cartReducer,
    categories: categorySlice,
    products: productsReducer,
  },
});
