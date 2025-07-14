import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    transactionsArray:[{}]
}
const allTransactionsSlice = createSlice({
    name: "allTransactions",
    initialState,
    reducers: {
        setTransactions: (state, action) => {
            console.log('Setting transactions:', action.payload);
            state.transactionsArray = action.payload;
        }
    }
})
export const { setTransactions } = allTransactionsSlice.actions;
export default allTransactionsSlice.reducer;