import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (itemPresent) {
        itemPresent.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const afterRemoveItem = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      state.cart = afterRemoveItem;
    },
    increamentQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      itemPresent.quantity++;
    },
    decreamentQuantity: (state, action) => {
      const itemPresent = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent.quantity === 1) {
        const afterRemoveItem = state.cart.filter(
          (item) => item.id !== action.payload.id
        );
        state.cart = afterRemoveItem;
      } else {
        itemPresent.quantity--;
      }
    },
    cleanCart: (state, action) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increamentQuantity,
  decreamentQuantity,
  cleanCart,
} = cartSlice.actions;

export default cartSlice.reducer;
