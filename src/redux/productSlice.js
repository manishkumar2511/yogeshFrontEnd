import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVisible: false,
    data: null,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        showDialog: (state) => {
            state.isVisible = true;
        },
        setProduct: (state, action) => {
            state.data = action.payload;
            state.isVisible = true;
        },
        hideProduct: (state) => {
            state.isVisible = false;
        },
        reset: (state) => {
            state.isVisible = false;
            state.data = null;
        },
    },
});

export const { setProduct, hideProduct, reset, showDialog } = productSlice.actions;
export default productSlice.reducer;