import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  status: null
  // total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // //console.log(action.payload.category);
      const existing = state.products.find(
        (product) => product.category === action.payload.category
      );
      if (existing) {
        // existing.quantity = existing.quantity + 1;
        state.status = `Already Added ${action.payload.category} Category Product`;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }

      // state.total = 1;
    },
    removeOne: (state, action) => {

      const existing = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (existing && existing.quantity > 1) {
        existing.quantity = existing.quantity - 1;
      } else {
        state.products = state.products.filter(
          (product) => product.id !== action.payload.id
        );
      }

      // state.total -= action.payload.price;
    },
    removeFromCart: (state, action) => {
      // const ActionID = String(action.payload.id);
      // const removeId = "product" + ActionID;
      // //console.log(action.payload.category);
      state.products = state.products.filter(
        (product) => product.category !== action.payload.category
      );
    },
  },
});

export const { addToCart, removeFromCart, removeOne } = cartSlice.actions;

export default cartSlice.reducer;
