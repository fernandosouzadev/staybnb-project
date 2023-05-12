import { createSlice } from '@reduxjs/toolkit'

interface loginModalReducer {
  isOpen: boolean
}
const initialState: loginModalReducer = {
  isOpen: false,
}

export const loginModalSlice = createSlice({
  name: 'loginModal',
  initialState,
  reducers: {
    setStatusLoginModal: (state, action) => {
      if (action.type === 'loginModal/setStatusLoginModal') {
        state.isOpen = action.payload
      }
      return state
    },
  },
})

export const { setStatusLoginModal } = loginModalSlice.actions
export default loginModalSlice.reducer
