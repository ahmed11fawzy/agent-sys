import coreApiSlice from "../core-api-slice";

export const commissionQuery = coreApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCommission: builder.mutation({
      query: (body) => ({
        url: `/sales/agents/commission-settings`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Agents"], // Invalidating Agents too as it might update agent details
    }),
    getCommissionSettings: builder.query({
      query: (query) => ({
        url: `/sales/agents/commission-settings?${query}`,
        method: "GET",
      }),
      providesTags: ["Commission"],
    }),
  }),
});

export const { useCreateCommissionMutation, useGetCommissionSettingsQuery } =
  commissionQuery;
