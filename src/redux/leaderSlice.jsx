import { createSlice } from "@reduxjs/toolkit";
import { LEADERS } from "../shared/leaders";

const initialState = {
    leaders: LEADERS,
    selectedLeader: null,
    loading: false,
    errMess: null,
};

const leaderSlice = createSlice({
    name: "leader",
    initialState,
    reducers: {
        leadersLoading: (state, action) => {
            state.loading = true;
            state.errMess = null;
        }
    }
});

export default leaderSlice.reducer;