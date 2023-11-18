import { createSlice } from '@reduxjs/toolkit';
// update 
// found issue that cart item not saved right when reload(or even render) is gone
// 1- save any change from this(add , + or - the quantity , remove) 
// load the cart from local storage 


const loadCartFromLocalStorage = () => {
  try {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return { cart };
  } catch (error) {
    console.error('Error loading cart from local storage:', error);
    return { cart: [] };
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    incrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    decrementQuantity: (state, action) => {
      const item = state.cart.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    setQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cart.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  setQuantity,
  removeItem,
} = cartSlice.actions;
