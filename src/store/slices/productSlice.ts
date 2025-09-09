import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts } from "@/lib/api";
import { IProduct } from "@/lib/types";

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

export const fetchProductsThunk = createAsyncThunk(
  "product/fetchProducts", 
  async (_, { rejectWithValue }) => {
    const response = await fetchProducts();
    if (response.error) {
      return rejectWithValue(response.error);
    }
    return response;
  }
)

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
      state.products = action.payload.data;
    })
    builder.addCase(fetchProductsThunk.rejected, (state, action) => {
      state.error = action.payload as string || 'Failed to load products 3';
      state.loading = false;
      state.loaded = false;
    })
  }
})

export default productSlice.reducer;
