import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TProducts = {
  _id?: string;
  name: string;
  price: number;
  quantity: number;
};

type TInitialState = {
  products: TProducts[];
  selectedProduct: TProducts | null;
};

const initialState: TInitialState = {
  products: [],
  selectedProduct: null,
};

const productSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    addNewProduct: (state, action: PayloadAction<TProducts>) => {
      state.products.push({ ...action.payload });
    },
    updateProduct: (state, action: PayloadAction<TProducts>) => {
      const updatedProduct = action.payload;
      const index = state.products.findIndex(
        (product) => product._id === updatedProduct._id
      );
      if (index !== -1) {
        state.products[index] = updatedProduct;
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
  },
});

export const { addNewProduct, deleteProduct, updateProduct } =
  productSlice.actions;

export default productSlice.reducer;
