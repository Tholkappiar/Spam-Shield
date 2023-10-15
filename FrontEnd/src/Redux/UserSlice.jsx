import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null
    },
    reducers:{
        login:(state,action)=>{
            state.user = action.payload;
        },
        logout:(state)=>{
            state.user=null;
        },
        updatePassword: (state, action) => {
            // Update the password in the Redux state
            state.user.password = action.payload;
          }
    }
})
export const {login , logout, updatePassword } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;