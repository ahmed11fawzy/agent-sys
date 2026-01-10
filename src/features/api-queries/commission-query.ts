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
  }),
});

export const { useCreateCommissionMutation } = commissionQuery;
