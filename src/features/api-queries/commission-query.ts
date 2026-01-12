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
    createAgentCommission: builder.mutation({
      query: (body) => ({
        url: `/sales/agents/commissions`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Commission"],
    }),
    getCommissionSettings: builder.query({
      query: (query) => ({
        url: `/sales/agents/commission-settings?${query}`,
        method: "GET",
      }),
      providesTags: ["Commission"],
    }),
    getAllCommissions: builder.query({
      query: () => ({
        url: `/sales/agents/commissions`,
        method: "GET",
      }),
      providesTags: ["Commission"],
    }),
  }),
});

export const { useCreateCommissionMutation, useGetCommissionSettingsQuery, useGetAllCommissionsQuery, useCreateAgentCommissionMutation } =
  commissionQuery;
