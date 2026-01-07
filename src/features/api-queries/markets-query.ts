import coreApiSlice from "../core-api-slice";

export const marketQuery = coreApiSlice.injectEndpoints({

    endpoints:(builder)=>({
        getMarkets:builder.query({
            query:(query) => ({
                url: `/markets?${query}`,
                method: "GET"
            }),
            providesTags:["Markets"]
        })
    })
    
});


export const {useGetMarketsQuery, useLazyGetMarketsQuery}=marketQuery