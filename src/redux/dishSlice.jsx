import { createSlice } from "@reduxjs/toolkit";
import { DISHES } from "../shared/dishes";

const initialState = {
    dishes: DISHES,
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
