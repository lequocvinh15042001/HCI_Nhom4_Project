import { createSlice } from '@reduxjs/toolkit';
import * as asyncThunk from '../async_thunk/reviewsAsync';

import { createObjectList } from '~/utils/funcs';

const initialState = {
    client: createObjectList(),
    admin: createObjectList(),
};

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {},
    extraReducers: {
        // getReviewsByProduct

        // getReivewsByAdmin
        [asyncThunk.getReviewsByAdmin.pending]: (state) => {
            state.admin.isLoading = true;
        },
        [asyncThunk.getReviewsByAdmin.fulfilled]: (state, { payload }) => {
            state.admin.isLoading = false;
            // state.admin.items = payload;
            state.admin.items = payload.list;
            state.admin.totalPage = payload.totalPage;
        },
        [asyncThunk.getReviewsByAdmin.rejected]: (state, { payload }) => {
            state.admin.message = 'error';
        },
    },
});

export default reviewsSlice.reducer;
