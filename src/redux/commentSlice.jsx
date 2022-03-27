
import { createSlice } from "@reduxjs/toolkit";
import {baseUrl} from "../shared/baseUrl";

const initialState = {
    comments: [],
    loading: true,
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
        },
        commentsFailed: (state, action) => {
            state.loading = false;
            state.errMess = action.payload;
        },
        addComments: (state, action) => {
            state.comments = action.payload;
            state.loading = false;
        }
    }
});

export const fetchComments = () => (dispatch) => {
    dispatch(commentSlice.actions.commentsLoading());
    return fetch(baseUrl + "comments")
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Something went wrong!");
            }
        })
        .then((comments) => {
            dispatch(commentSlice.actions.addComments(comments));
        })
        .catch((err) => {
            dispatch(commentSlice.actions.commentsFailed(err.message));
        });
};

export const { commentsLoading, addComment } = commentSlice.actions;

export default commentSlice.reducer;