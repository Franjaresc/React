import { createSlice } from '@reduxjs/toolkit';
import { baseUrl } from '../shared/baseUrl';

const initialState = {
    feedbacks: [],
    loading: true,
    errMess: null,
};

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        feedbackLoading: (state, action) => {
            state.loading = true;
            state.errMess = null;
        },
        addFeedback: (state, action) => {
            state.feedbacks.push(action.payload);
        },
        feedbackFailed: (state, action) => {
            state.loading = false;
            state.errMess = action.payload;
        },
        addFeedbacks: (state, action) => {
            state.feedbacks = action.payload;
            state.loading = false;
        }
    }
});
export const fetchFeedbacks = () => (dispatch) => {
    dispatch(feedbackSlice.actions.feedbackLoading());
    return fetch(baseUrl + 'feedback')
        .then(
            (res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Something went wrong!');
                }
            },
            (err) => {
                dispatch(feedbackSlice.actions.feedbackFailed(err.message));
            }
        )
        .then((feedbacks) => {
            dispatch(feedbackSlice.actions.addFeedbacks(feedbacks));
        })
        .catch((err) => {
            dispatch(feedbackSlice.actions.feedbackFailed(err.message));
        });
};

export const postFeedback = (firstname, lastname, telnum, email, agree, contactType, message, id) => (dispatch) => {
    console.log(firstname, lastname, telnum, email, agree, contactType, message, id);
    const newFeedback = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message,
    };
    newFeedback.date = new Date().toISOString();
    newFeedback.id = id+1;
    dispatch(feedbackSlice.actions.feedbackLoading());
    
    return fetch(baseUrl + 'feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(
            (res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Something went wrong!');
                }
            },
            (err) => {
                dispatch(feedbackSlice.actions.feedbackFailed(err.message));
            }
        )
        .then((feedback) => {
            dispatch(feedbackSlice.actions.addFeedback(feedback));
        })
        .catch((err) => {
            dispatch(feedbackSlice.actions.feedbackFailed(err.message));
        });
};

export default feedbackSlice.reducer;