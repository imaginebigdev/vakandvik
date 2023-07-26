import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsCart: [],
  },
  reducers: {
    setItems(state, action) {
      state.itemsCart = action.payload;
    },
  },
});

export const { setItems } = cartSlice.actions;
export default cartSlice.reducer;
