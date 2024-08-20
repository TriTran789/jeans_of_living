import { apiSlice } from "../api/apiSlice";

export const collectionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCollection: builder.mutation({
      query: ({ name }) => ({
        url: "create-collection",
        method: "POST",
        body: {
          name,
        },
        credentials: "include" as const,
      }),
    }),
    getAllCollections: builder.mutation({
      query: () => ({
        url: "get-all-collections",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    removeCollection: builder.mutation({
      query: (id) => ({
        url: `remove-collection/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useCreateCollectionMutation, useGetAllCollectionsMutation, useRemoveCollectionMutation } =
  collectionApi;
