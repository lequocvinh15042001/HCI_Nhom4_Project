import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
    },
    reducers: {
        toggleOpen: (state) => {
            state.isOpen = !state.isOpen;
        },
        open: (state) => {
            state.isOpen = true;
        },
        close: (state) => {
            state.isOpen = false;
        },
    },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
