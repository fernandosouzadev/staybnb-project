import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import registerModalReducer from './registerModal/slice'

export const store = configureStore({
  reducer: { registerModalReducer },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [logger],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
