import { createSlice } from '@reduxjs/toolkit';
import * as asyncThunk from '../async_thunk/categoriesAsync';

const initialState = {
    isLoading: false,
    isLoadingAdmin: false,
    items: [],
    itemsAdmin: [],
    message: '',
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: {
        // getAllCategory
        [asyncThunk.getAllCategory.pending]: (state) => {
            state.isLoading = true;
        },
        [asyncThunk.getAllCategory.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.items = payload;
        },
        [asyncThunk.getAllCategory.rejected]: (state, { payload }) => {
            state.message = payload;
        },

        // getAllCategoryByAdmin
        [asyncThunk.getAllCategoryByAdmin.pending]: (state) => {
            state.isLoadingAdmin = true;
        },
        [asyncThunk.getAllCategoryByAdmin.fulfilled]: (state, { payload }) => {
            state.isLoadingAdmin = false;
            state.itemsAdmin = payload;
        },
        [asyncThunk.getAllCategoryByAdmin.rejected]: (state, { payload }) => {
            state.message = payload;
        },
    },
});

export const categoriesActions = categoriesSlice.actions;
export default categoriesSlice.reducer;
