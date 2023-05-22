import { createSlice } from '@reduxjs/toolkit';
import * as asyncThunk from '../async_thunk/statisticalAsync';

const initialState = {
    isLoading: false,
    statisticalAmount: [],
    message: '',
};

const statisticalSlice = createSlice({
    name: 'statistical',
    initialState,
    reducers: {},
    extraReducers: {
        [asyncThunk.getStatistical.pending]: (state) => {
            state.isLoading = true;
        },
        [asyncThunk.getStatistical.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.statisticalAmount = payload;
        },
        [asyncThunk.getStatistical.rejected]: (state, { payload }) => {
            state.message = payload;
        },
    },
});

export const statisticalActions = statisticalSlice.actions;
export default statisticalSlice.reducer;
