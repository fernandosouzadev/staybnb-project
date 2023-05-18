import { createSlice } from '@reduxjs/toolkit'

interface chatInfoSideBarReducer {
  isOpen: boolean
}
const initialState: chatInfoSideBarReducer = {
  isOpen: false,
}

export const chatInfoSideBarSlice = createSlice({
  name: 'chatInfoSideBar',
  initialState,
  reducers: {
    setStatusChatInfoSideBar: (state, action) => {
      if (action.type === 'chatInfoSideBar/setStatusChatInfoSideBar') {
        state.isOpen = action.payload
      }
      return state
    },
  },
})

export const { setStatusChatInfoSideBar } = chatInfoSideBarSlice.actions
export default chatInfoSideBarSlice.reducer
