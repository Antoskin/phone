import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlice";
import bucketSlice from "./slices/bucketSlice";

const store = configureStore({
  reducer: {
    product: productSlice,
    bucket: bucketSlice
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;