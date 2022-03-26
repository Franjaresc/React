import { createSlice } from "@reduxjs/toolkit";
import { DISHES } from "../shared/dishes";
import { COMMENTS } from "../shared/comments";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";

const initialState = {
    dishes: DISHES,
    comments: COMMENTS,
    promotions: PROMOTIONS,
    leaders: LEADERS,
    selectedDish: null,
    loading: false,
    errMess: null,
};

const dishSlice = createSlice({
    name: "dish",
    initialState,
    reducers: {
        dishesLoading: (state, action) => {
            state.loading = true;
            state.errMess = null;
        }
    }
});


export default dishSlice.reducer;
