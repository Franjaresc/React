import { createSlice } from "@reduxjs/toolkit";
import { DISHES } from "../shared/dishes";

const initialState = {
    dishes: [],
    selectedDish: null,
    loading: true,
    errMess: null,
};

const dishSlice = createSlice({
    name: "dish",
    initialState,
    reducers: {
        dishesLoading: (state, action) => {
            state.loading = true;
            state.errMess = null;
        },
        dishesFailed: (state, action) => {
            state.loading = false;
            state.errMess = action.payload;
        },
        addDishes: (state, action) => {
            state.dishes = action.payload;
            state.loading = false;
        },
        addDish: (state, action) => {
            state.dishes.push(action.payload);
        },
        selectDish: (state, action) => {
            state.selectedDish = action.payload;
        },
        deleteDish: (state, action) => {
            state.dishes = state.dishes.filter((dish) => dish.id !== action.payload);
        },
        updateDish: (state, action) => {
            const index = state.dishes.findIndex((dish) => dish.id === action.payload.id);
            state.dishes[index] = action.payload;
        }
    }
});

export const fetchDishes = () => dispatch => {
    dispatch(dishSlice.actions.dishesLoading());
    setTimeout(() => {
        dispatch(dishSlice.actions.addDishes(DISHES));
    }, 2000);
};



export default dishSlice.reducer;
