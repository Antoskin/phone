import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "@/lib/api";
import { IProduct } from "@/lib/types";
import { IApiResponse } from "@/lib/api";

interface IProductState {
  products: IProduct[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

const initialState: IProductState = {
  products: [],
  loading: false,
  loaded: false,
  error: null
}

export const fetchProductsThunk = createAsyncThunk("product/fetchProducts", async () => {
  const response = await fetchProducts();
  return response
})

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsThunk.pending, (state) => {
      state.loading = true;
      state.loaded = false;
    })
    builder.addCase(fetchProductsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.loaded = true;
      state.products = action.payload;
    })
    builder.addCase(fetchProductsThunk.rejected, (state, action) => {
      state.error = action.error.message || 'Failed to load countries';
      state.loading = false;
      state.loaded = false;
    })
  }
})

export default productSlice.reducer;