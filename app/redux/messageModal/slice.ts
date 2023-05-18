import { createSlice } from '@reduxjs/toolkit'

interface messageModalReducer {
  isOpen: boolean
}
const initialState: messageModalReducer = {
  isOpen: false,
}

export const messageModalSlice = createSlice({
  name: 'messageModal',
  initialState,
  reducers: {
    setStatusMessageModal: (state, action) => {
      if (action.type === 'messageModal/setStatusMessageModal') {
        state.isOpen = action.payload
      }
      return state
    },
  },
})

export const { setStatusMessageModal } = messageModalSlice.actions
export default messageModalSlice.reducer
