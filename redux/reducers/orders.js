import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const url = process.env.NEXT_APP_URL_BACK;
const key_admin = process.env.NEXT_APP_KEY_ADMIN;

const ordersSlice = createSlice({
  name: "categories",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchOrderStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    fetchOrderSuccesfull(state, action) {
      state.loading = false;
      state.orders = action.payload;
    },
    fetchOrderFailiure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    modifyOrderStart(state, action) {
      state.loading = true;
      state.error = null;
    },
    modifyOrderSuccess(state, action) {
      state.loading = false;
    },
    modifyOrderFailiure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchOrderStart,
  fetchOrderSuccesfull,
  fetchOrderFailiure,
  modifyOrderStart,
  modifyOrderSuccess,
  modifyOrderFailiure,
} = ordersSlice.actions;
export default ordersSlice.reducer;

export const fetchOrders = () => async (dispatch) => {
  try {
    dispatch(fetchOrderStart());
    const response = await axios.get(`${url}orders`, {
      params: { key_admin: key_admin },
    });
    dispatch(fetchOrderSuccesfull(response.data));
  } catch (error) {
    dispatch(fetchOrderFailiure(error.message));
  }
};

export const modifyOrder = (id, modify) => async (dispatch) => {
  try {
    dispatch(fetchOrderStart());
    dispatch(modifyOrderStart());
    await axios.put(`${url}orders/${id}`, { ...modify, key_admin });
    const response = await axios.get(`${url}orders`, {
      params: { key_admin: key_admin },
    });
    dispatch(fetchOrderSuccesfull(response.data));
    dispatch(modifyOrderSuccess());
  } catch (error) {
    dispatch(modifyOrderFailiure(error.message));
  }
};
