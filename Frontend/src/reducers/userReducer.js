import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../api/user";

let initialState = {user: null};



const user = JSON.parse(sessionStorage.getItem("user"))
console.log(user);
if (user) {
  initialState = { user: user };
} 
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUser} = userSlice.actions;

export default userSlice.reducer;
