import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/products";
import categorySlice from "./reducers/categories";
import cartReducer from "./reducers/cart";
import ordersReducer from "./reducers/orders";

export default configureStore({
  reducer: {
    orders: ordersReducer,
    cart: cartReducer,
    categories: categorySlice,
    products: productsReducer,
  },
});
