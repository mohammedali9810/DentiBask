//install 
// configure store 
// Slices each slice has => Name , initalState , reducers(set of functions) 
        //and the creter slice create actions with the names of reducr
//export from slice=> action , reducer 
//reducer and add => configureStore
//wrap app with provider(tag) from react-redux and use store as prop


import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cartslice";

export const store = configureStore({
    initial: {
        quanity: 0,
        price: 0,
        total: 0

    },
  reducer: cartReducer
})


export default store;
