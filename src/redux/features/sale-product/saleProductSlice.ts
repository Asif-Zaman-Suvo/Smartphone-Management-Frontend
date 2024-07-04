import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type TSaleDetails = {
  nameOfTheBuyer: string;
  sellingQuantity: number;
  sellingDate: string;
};

type TInitialState = {
  saleProducts: TSaleDetails[];
};

const initialState: TInitialState = {
  saleProducts: [],
};

const saleProductSlice = createSlice({
  name: "SaleProduct",
  initialState,
  reducers: {
    addNewSale: (state, action: PayloadAction<TSaleDetails>) => {
      state.saleProducts.push({ ...action.payload });
    },
  },
});

export const { addNewSale } = saleProductSlice.actions;

export default saleProductSlice.reducer;
