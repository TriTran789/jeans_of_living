import { apiSlice } from "../api/apiSlice";
import { userEdit } from "../auth/authSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    editProfile: builder.mutation({
      query: ({ lastname, firstname, address, phone }) => ({
        url: "update-user-info",
        method: "PUT",
        body: { lastname, firstname, address, phone },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userEdit({
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    updatePassword: builder.mutation({
      query: ({ oldPassword, newPassword }) => ({
        url: "update-user-password",
        method: "PUT",
        body: { oldPassword, newPassword },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useEditProfileMutation, useUpdatePasswordMutation } = userApi;
