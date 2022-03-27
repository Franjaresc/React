import { createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../shared/baseUrl";

const initialState = {
    leaders: [],
    selectedLeader: null,
    loading: true,
    errMess: null,
};

const leaderSlice = createSlice({
    name: "leader",
    initialState,
    reducers: {
        leadersLoading: (state, action) => {
            state.loading = true;
            state.errMess = null;
        },
        leadersFailed: (state, action) => {
            state.loading = false;
            state.errMess = action.payload;
        },
        addLeaders: (state, action) => {
            state.leaders = action.payload;
            state.loading = false;
        },
        addLeader: (state, action) => {
            state.selectedLeader = action.payload;
        }
    }
});

export const fetchLeaders = () => (dispatch) => {
    dispatch(leaderSlice.actions.leadersLoading());
    return fetch(baseUrl + "leaders")
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Something went wrong!");
            }
        })
        .then((leaders) => {
            dispatch(leaderSlice.actions.addLeaders(leaders));
        })
        .catch((err) => {
            dispatch(leaderSlice.actions.leadersFailed(err.message));
        });
};

export default leaderSlice.reducer;