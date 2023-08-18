import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../api/user";

let initialState = {};

const user = getUser()

if (user) {
  initialState = { user: user };
} else {
  initialState = { user: null };
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
