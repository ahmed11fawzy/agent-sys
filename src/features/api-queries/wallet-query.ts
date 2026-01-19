import coreApiSlice from "../core-api-slice";


const walletQuery = coreApiSlice.injectEndpoints({
    
    endpoints: (builder) => ({
        getWallet: builder.query({
            query: () => ({
                url: '/dashboard/wallet',
                method: 'GET',
            }),
            providesTags: ['Wallet'],
        }),
        getTransaction: builder.query({
            query: () => ({
                url: '/dashboard/transactions',
                method: 'GET',
            }),
            providesTags: ['Transactions'],
        }),
        getAllWithdrawals: builder.query({
            query: () => ({
                url: '/dashboard/withdrawals',
                method: 'GET',
            }),
            providesTags: ['Withdrawals'],
        }),
        createWithdrawal: builder.mutation({
            query: (body) => ({
                url: '/dashboard/request-withdrawal',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Withdrawals'],
        }),
    })

})


export  const {useGetWalletQuery,useGetTransactionQuery ,useGetAllWithdrawalsQuery,useCreateWithdrawalMutation} = walletQuery