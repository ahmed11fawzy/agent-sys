import coreApiSlice from "../core-api-slice";

const storesQuery = coreApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getStores: builder.query({
            query: (query) => ({
                url: `/sales/agents/stores?${query}`,
                method: 'GET',
            }),
            providesTags: ['Stores'],
        }),
    }),
});

export const { useGetStoresQuery, useLazyGetStoresQuery } = storesQuery;