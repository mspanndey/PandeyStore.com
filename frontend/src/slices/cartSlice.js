import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentMethod: "paypal" }; // Fixed typo here
const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const items = action.payload;
      const existitem = state.cartItems.find((x) => x._id === items._id); // Fixed missing return

      if (existitem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existitem._id ? items : x
        ); // Fixed map on cartItems
      } else {
        state.cartItems = [...state.cartItems, items];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },

    savePaypalMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    clearFromCart: (state, action) => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaypalMethod,
  clearFromCart,
} = CartSlice.actions;
export default CartSlice.reducer;
