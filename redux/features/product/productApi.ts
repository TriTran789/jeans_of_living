import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data: any) => ({
        url: "create-product",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllProducts: builder.mutation({
      query: () => ({
        url: "get-all-products",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getProductDetail: builder.mutation({
      query: (id: string) => ({
        url: `product/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    removeProduct: builder.mutation({
      query: (id: string) => ({
        url: `remove-product/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    editProductDetail: builder.mutation({
      query: (data: any) => ({
        url: "edit-product",
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsMutation,
  useGetProductDetailMutation,
  useEditProductDetailMutation,
  useRemoveProductMutation,
} = productApi;
