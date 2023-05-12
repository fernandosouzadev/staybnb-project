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
    setStatusRegisterModal: (state, action) => {
      if (action.type === 'registerModal/setStatusRegisterModal') {
        state.isOpen = action.payload
      }
      return state
    },
  },
})

export const { setStatusRegisterModal } = registerModalSlice.actions
export default registerModalSlice.reducer
