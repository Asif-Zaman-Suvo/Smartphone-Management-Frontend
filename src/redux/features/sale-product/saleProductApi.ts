import { baseApi } from "../../api/baseApi";

const productSellApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    saleAProduct: builder.mutation({
      query: ({ productId, saleDetails }) => ({
        url: `/sell/${productId}`,
        method: "POST",
        body: saleDetails,
      }),
      invalidatesTags: ["product"],
    }),
    getAllSaleProducts: builder.query({
      query: (timeFrame) => ({
        url: "/allSaleProducts",
        method: "GET",
        params: { timeFrame },
      }),
      providesTags: ["product"],
    }),
  }),
});

export const { useSaleAProductMutation, useGetAllSaleProductsQuery } =
  productSellApi;
