import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    username: "",
    email: "",
    limit: null,
}
const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUser: (state, action) => {
            console.log('Setting user info:', action.payload);
            state.username= action.payload.username;
            state.email= action.payload.email;
        },
        setLimit: (state, action) => {
            state.limit = action.payload;
        }
    }
})
export const { setUser,setLimit} = userInfoSlice.actions;
export default userInfoSlice.reducer;