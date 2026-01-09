import coreApiSlice from "../core-api-slice";

export const activitiesQuery = coreApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllActivities: builder.query({
      query: (params) => ({
        url: "/sales/agents/activities",
        method: "GET",
        params: params,
      }),
      providesTags: ["Activities"],
    }),
    getActivity: builder.query({
      query: (id) => ({
        url: `/sales/agents/activities/${id}`,
        method: "GET",
      }),
      providesTags: ["Activities"],
    }),
    deleteActivity: builder.mutation({
      query: (id) => ({
        url: `/sales/agents/activities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Activities"],
    }),
    createActivity: builder.mutation({
      query: (body) => ({
        url: "/sales/agents/activities",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Activities"],
    }),
  }),
});

export const {
  useGetAllActivitiesQuery,
  useLazyGetAllActivitiesQuery,
  useGetActivityQuery,
  useDeleteActivityMutation,
  useCreateActivityMutation,
} = activitiesQuery;