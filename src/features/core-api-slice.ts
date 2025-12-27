
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const Base_URL = import.meta.env.VITE_BASE_URL;
 console.log(Base_URL)
const coreApiSlice = createApi({
    reducerPath: "coreApi",
    baseQuery: fetchBaseQuery({
        baseUrl: Base_URL,
        
        
    }),
    endpoints: () => ({}),


});




export default coreApiSlice;