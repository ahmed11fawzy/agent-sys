
import coreApiSlice from "../core-api-slice";

 export const agentQuery = coreApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAgents: builder.query({
            query: (query) => ({
                url: `/agents?${query}`,
                method: 'GET',
            }),
            providesTags: ['Agents'],
        }),
        createAgent: builder.mutation({
            query: (body) => ({
                url: `/agents`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Agents'],
        }),
    }),
});


export const {useLazyGetAgentsQuery, useCreateAgentMutation} = agentQuery;


