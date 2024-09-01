import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const issuesApi = createApi({
  reducerPath: "issuesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummy.restapiexample.com/api/v1" }),
  endpoints: (builder) => ({
    getAllEmployees: builder.query({
      query: () => ({
        url: "/employees",
        method: "GET",
      }),
    }),
    saveEmployees: builder.mutation({
      query: (args) => ({
        url: "/employees",
        method: "POST",
        body: JSON.stringify({
          title: args.title, // Ensure title is a string
          description: args.description, // Ensure description is a string
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    updateEmployee: builder.mutation({
      query: (args) => ({
        url: `/employees/${args.id}/update`,
        method: "PUT",
        body: JSON.stringify({
          title: args.title, // Ensure title is a string
          description: args.description, // Ensure description is a string
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    deleteIssue: builder.mutation({
      query: (args) => ({
        url: `/employees/${args.id}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useSaveEmployeesMutation,
  useUpdateEmployeeMutation,
  useDeleteIssueMutation,
} = issuesApi;
