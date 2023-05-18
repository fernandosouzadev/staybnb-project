import { createSlice } from '@reduxjs/toolkit'

interface messageListMobileReducer {
  isOpen: boolean
}
const initialState: messageListMobileReducer = {
  isOpen: false,
}

export const messageListMobileSlice = createSlice({
  name: 'messageListMobile',
  initialState,
  reducers: {
    setStatusMessageListMobile: (state, action) => {
      if (action.type === 'messageListMobile/setStatusMessageListMobile') {
        state.isOpen = action.payload
      }
      return state
    },
  },
})

export const { setStatusMessageListMobile } = messageListMobileSlice.actions
export default messageListMobileSlice.reducer
