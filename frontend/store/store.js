import {configureStore} from "@reduxjs/toolkit";
import userInfoReducer from "@/features/userInfo/userInfoSlice";

export const store = configureStore({
    reducer: {
        // Add your reducers here
        userInfo: userInfoReducer,
    }
})
export default store;