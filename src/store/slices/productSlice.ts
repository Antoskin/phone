import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { fetchProducts } from "@/lib/api";
import { IProduct } from "@/lib/types";
import { PayloadAction } from "@reduxjs/toolkit";

interface IProductState {
  products: IProduct[];
  filteredProducts: IProduct[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

const initialState: IProductState = {
  products: [],
  filteredProducts: [],
  loading: true,
  loaded: false,
  error: null
}

// export const fetchProductsThunk = createAsyncThunk(
//   "product/fetchProducts", 
//   async (_, { rejectWithValue }) => {
//     const response = await fetchProducts();
//     if (response.error) {
//       return rejectWithValue(response.error);
//     }
//     return response;
//   }
// )

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.loaded = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    filterProducts: (state, action) => {
      state.filteredProducts = state.products.filter((product) => product.userId === parseInt(action.payload));
    },
    resetFilter: (state) => {
      state.filteredProducts = state.products;
    }
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchProductsThunk.pending, (state) => {
  //     state.loading = true;
  //     state.loaded = false;
  //   })
  //   builder.addCase(fetchProductsThunk.fulfilled, (state, action) => {
  //     state.loading = false;
  //     state.loaded = true;
  //     state.products = action.payload.data;
  //     state.filteredProducts = action.payload.data;
  //   })
  //   builder.addCase(fetchProductsThunk.rejected, (state, action) => {
  //     state.error = action.payload as string || 'Failed to load products 3';
  //     state.loading = false;
  //     state.loaded = false;
  //   })
  // }
})

export const { setProducts, setError, filterProducts, resetFilter, setLoading } = productSlice.actions;

export default productSlice.reducer;
