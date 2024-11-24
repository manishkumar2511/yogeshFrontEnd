import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    role: "",
    id: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action) {
            state.username = action.payload.username;
            state.role = action.payload.role;
            state.id = action.payload.id;
        },
        reset(state) {
            Object.assign(state, initialState);
        },
        logout(state) {
            state.username = null;
            state.role = null;
            state.id = null;
        },
    }
});

export const { setUser, reset, logout } = authSlice.actions;
export default authSlice.reducer;