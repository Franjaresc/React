import { createSlice } from "@reduxjs/toolkit";
import {baseUrl} from "../shared/baseUrl";

const initialState = {
    promotions: [],
    loading: true,
    errMess: null,
};

const promotionSlice = createSlice({
    name: "promotion",
    initialState,
    reducers: {
        promotionsLoading: (state, action) => {
            state.loading = true;
            state.errMess = null;
        },
        promotionsFailed: (state, action) => {
            state.loading = false;
            state.errMess = action.payload;
        },
        addPromotions: (state, action) => {
            state.promotions = action.payload;
            state.loading = false;
        }
    }
});

export const fetchPromotions = () => (dispatch) => {
    dispatch(promotionSlice.actions.promotionsLoading());
    return fetch(baseUrl + "promotions")
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Something went wrong!");
            }
        })
        .then((promotions) => {
            dispatch(promotionSlice.actions.addPromotions(promotions));
        })
        .catch((err) => {
            dispatch(promotionSlice.actions.promotionsFailed(err.message));
        });
};

export default promotionSlice.reducer;