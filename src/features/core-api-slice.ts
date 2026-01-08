
import type { AuthorizedUser } from "@/types/authorized-user-type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const Base_URL = import.meta.env.VITE_BASE_URL;
 console.log(Base_URL)
const coreApiSlice = createApi({
    reducerPath: "coreApi",
    baseQuery: fetchBaseQuery({
        baseUrl: Base_URL,
        prepareHeaders: (headers) => {
            const user = JSON.parse(localStorage.getItem("user") as string) as AuthorizedUser;
            if (user) {
                headers.set("Authorization", `Bearer ${user.token}`);
                headers.set("Accept", "application/json");
            }
            return headers;
        },
        
    }),
    endpoints: () => ({}),
    tagTypes: ['Agents','Stores','AgentStores','Markets','Activities'],

});




export default coreApiSlice;