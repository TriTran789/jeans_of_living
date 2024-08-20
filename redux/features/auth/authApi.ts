import { apiSlice } from "../api/apiSlice";
import {
  userConfirmed,
  userForgotPassword,
  userLoggedIn,
  userLoggedOut,
  userResetPassword,
} from "./authSlice";

type RegistraionResponse = {
  success: boolean;
};

type RegistrationData = {};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // enpoinst here
    register: builder.mutation<RegistraionResponse, RegistrationData>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedOut({
              accessToken: "",
              user: "",
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: "request-reset-password",
        method: "POST",
        body: { email },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userForgotPassword({
              confirmedToken: result.data.confirmedToken,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    confirm: builder.mutation({
      query: ({ confirmed_token, confirmed_code }) => ({
        url: "confirm-forgot-password",
        method: "POST",
        body: { confirmed_token, confirmed_code },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userConfirmed({ user: result.data.user }));
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    resetPassword: builder.mutation({
      query: ({ email, newPassword }) => ({
        url: "reset-password",
        method: "PUT",
        body: { email, newPassword },
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(userResetPassword({ user: "" }));
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogOutMutation,
  useForgotPasswordMutation,
  useConfirmMutation,
  useResetPasswordMutation,
} = authApi;
