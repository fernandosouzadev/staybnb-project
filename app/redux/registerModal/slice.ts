import { createSlice } from '@reduxjs/toolkit'

interface registerModalReducer {
  isOpen: boolean
}
const initialState: registerModalReducer = {
  isOpen: false,
}

export const registerModalSlice = createSlice({
  name: 'registerModal',
  initialState,
  reducers: {
    status: (state, action) => {
      if (action.type === 'registerModal/status') {
        state.isOpen = action.payload
      }
      return state
    },
  },
})

export const { status } = registerModalSlice.actions
export default registerModalSlice.reducer
