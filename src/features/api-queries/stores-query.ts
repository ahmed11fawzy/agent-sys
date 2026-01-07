import coreApiSlice from "../core-api-slice";

const storesQuery = coreApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStores: builder.query({
            query: (query) => ({
                url: `/sales/teams/stores?${query}`,
                method: 'GET',
            }),
            providesTags: ['Stores'],
        }),
        createStore: builder.mutation({
            query: (body) => ({
                url: `sales/agents/stores`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Stores'],
        }),
    }),
});

export const { useGetStoresQuery, useLazyGetStoresQuery ,useCreateStoreMutation } = storesQuery;