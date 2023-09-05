import { createSlice } from '@reduxjs/toolkit'

const getUserFromSession = () => {
  const user = JSON.parse(sessionStorage.getItem('session'))
  return user ? user : null
}

const initialState = {
  user: getUserFromSession(),
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  },
})

export const { setUser } = userSlice.actions

export const selectUser = (state) => state.user.user

export default userSlice.reducer
