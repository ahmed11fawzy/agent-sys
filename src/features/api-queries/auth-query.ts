import coreApiSlice from "../core-api-slice";


export const authQuery =coreApiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: `/login`,
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Agents'],
        }),
    }),
});


export const { useLoginMutation } = authQuery;

