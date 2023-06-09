import { configureStore } from '@reduxjs/toolkit'
import registerModalReducer from './registerModal/slice'
import loginModalReducer from './loginModal/slice'
import currentUserReducer from './currentUser/slice'
import rentModalReducer from './rentModal/slice'
import searchModalReducer from './searchModal/slice'
import chatInfoSideBarReducer from './chatInfoSideBar/slice'
import messageModalReducer from './messageModal/slice'
import messageListMobileReducer from './messageListMobile/slice'

export const store = configureStore({
  reducer: {
    registerModalReducer,
    loginModalReducer,
    currentUserReducer,
    rentModalReducer,
    searchModalReducer,
    chatInfoSideBarReducer,
    messageModalReducer,
    messageListMobileReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
