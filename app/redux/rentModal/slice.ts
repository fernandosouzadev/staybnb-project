import { createSlice } from '@reduxjs/toolkit'

interface RentModalReducer {
  isOpen: boolean
}
const initialState: RentModalReducer = {
  isOpen: false,
}

export const rentModalSlice = createSlice({
  name: 'rentModal',
  initialState,
  reducers: {
    setStatusRentModal: (state, action) => {
      if (action.type === 'rentModal/setStatusRentModal') {
        state.isOpen = action.payload
      }
      return state
    },
  },
})

export const { setStatusRentModal } = rentModalSlice.actions
export default rentModalSlice.reducer
