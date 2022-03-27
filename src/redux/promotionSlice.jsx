import { createSlice } from "@reduxjs/toolkit";
import { PROMOTIONS } from "../shared/promotions";

const initialState = {
    promotions: PROMOTIONS,
    loading: false,
    errMess: null,
};

const promotionSlice = createSlice({
    name: "promotion",
    initialState,
    reducers: {
        promotionsLoading: (state, action) => {
            state.loading = true;
            state.errMess = null;
        }
    }
});

export default promotionSlice.reducer;