import {configureStore} from "@reduxjs/toolkit";
import userInfoReducer from "@/features/userInfo/userInfoSlice";
import allTransactionsReducer from "@/features/allTransactions/allTransactionsSlice";
import allAccountsReducer from "@/features/accounts/allAccountsSlice";

export const store = configureStore({
    reducer: {
        // Add your reducers here
        userInfo: userInfoReducer,
        allTransactions: allTransactionsReducer,
        allAccounts: allAccountsReducer
    }
})
export default store;