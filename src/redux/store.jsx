import { configureStore } from '@reduxjs/toolkit'
import dishReducer from './dishSlice'

export default configureStore({
  reducer: {
    dish: dishReducer,
  },
})