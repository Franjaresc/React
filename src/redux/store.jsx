import { configureStore } from '@reduxjs/toolkit'
import dishReducer from './dishSlice'
import commentReducer from './commentSlice'
import promotionReducer from './promotionSlice'
import leaderReducer from './leaderSlice'
import { createForms } from 'react-redux-form'
import { InitialFeedback } from './form'

export default configureStore({
  reducer: {
    dish: dishReducer,
    comment: commentReducer,
    promotion: promotionReducer,
    leader: leaderReducer,
    ...createForms({
      feedback: InitialFeedback,
    })
  },
})