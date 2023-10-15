import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Redux/UserSlice"

export default configureStore({
    reducer:{
        user:userReducer,
    }
})