
import { createSlice } from "@reduxjs/toolkit";
import { COMMENTS } from "../shared/comments";

const initialState = {
    comments: COMMENTS,
    loading: false,
    errMess: null,
};

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        commentsLoading: (state, action) => {
            state.loading = true;
            state.errMess = null;
        },
        addComment: (state, action) => {
            state.comments.push(action.payload);
        }
    }
});

export const { commentsLoading, addComment } = commentSlice.actions;

export default commentSlice.reducer;