import { User } from '@prisma/client'
import { createSlice } from '@reduxjs/toolkit'

interface CurrentUserReducer {
  user: User | null
}
const initialState: CurrentUserReducer = {
  user: null,
}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      if (action.type === 'currentUser/setCurrentUser') {
        state.user = action.payload
      }
      return state
    },
  },
})

export const { setCurrentUser } = currentUserSlice.actions
export default currentUserSlice.reducer
