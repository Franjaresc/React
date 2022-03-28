import { configureStore } from '@reduxjs/toolkit'
import dishReducer from './dishSlice'
import commentReducer from './commentSlice'
import promotionReducer from './promotionSlice'
import leaderReducer from './leaderSlice'
import feedbacksReducer from './feedbackSlice'

export default configureStore({
  reducer: {
    dish: dishReducer,
    comment: commentReducer,
    promotion: promotionReducer,
    leader: leaderReducer,
    feedbacks: feedbacksReducer,
  },
})