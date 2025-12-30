import type { AuthorizedUser } from "@/types/authorized-user-type";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";



interface AuthState {
    user: AuthorizedUser | null;
}

const getAuthorizedUser = () => {
    const user = localStorage.getItem("user");
    if (user) {
        return JSON.parse(user) as AuthorizedUser;
    }
    return null;
}

const authState: AuthState = {
    user: getAuthorizedUser(),
}
console.log("authState",authState.user)
 
const authSlice = createSlice({
    name: "auth",
    initialState: authState,
    reducers: {
        setCredentials: (state, action: PayloadAction<AuthorizedUser>) => {
            console.log("action.payload",action.payload)
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        removeCredentials: (state) => {
            state.user = null;
            localStorage.removeItem("user");
        },
    },

});

export const { setCredentials, removeCredentials } = authSlice.actions;
export default authSlice.reducer;
