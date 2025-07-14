import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    username: "",
    email: "",
}
const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.username= action.payload.username;
            state.email= action.payload.email;
        }
    }
})
export const { setUser} = userInfoSlice.actions;
export default userInfoSlice.reducer;