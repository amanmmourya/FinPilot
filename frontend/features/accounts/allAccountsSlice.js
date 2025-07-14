import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    accountsArray:[{}]
}
const allAccountsSlice = createSlice({
    name: "allAccounts",
    initialState,
    reducers: {
        setAccounts: (state, action) => {
            console.log('Setting accounts:', action.payload);
            state.accountsArray = action.payload;
        }
    }
})
export const { setAccounts } = allAccountsSlice.actions;
export default allAccountsSlice.reducer;