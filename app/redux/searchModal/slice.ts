import { createSlice } from '@reduxjs/toolkit'

interface searchModalReducer {
  isOpen: boolean
}
const initialState: searchModalReducer = {
  isOpen: false,
}

export const searchModalSlice = createSlice({
  name: 'searchModal',
  initialState,
  reducers: {
    setStatusSearchModal: (state, action) => {
      if (action.type === 'searchModal/setStatusSearchModal') {
        state.isOpen = action.payload
      }
      return state
    },
  },
})

export const { setStatusSearchModal } = searchModalSlice.actions
export default searchModalSlice.reducer
