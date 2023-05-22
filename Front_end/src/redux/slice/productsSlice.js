import { createSlice } from '@reduxjs/toolkit';
import * as asyncThunk from '../async_thunk/productsAsync';

import { createObjectList } from '~/utils/funcs';

const initialState = {
    client: createObjectList(),
    admin: createObjectList(),
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: {
        // getAllProductByClient
        [asyncThunk.getAllProductByClient.pending]: (state) => {
            state.client.isLoading = true;
        },
        [asyncThunk.getAllProductByClient.fulfilled]: (state, { payload }) => {
            state.client.isLoading = false;
            state.client.items = payload.list;
            state.client.totalPage = payload.totalPage;
        },
        [asyncThunk.getAllProductByClient.rejected]: (state, { payload }) => {
            state.client.message = 'error';
        },

        // getAllProductByAdmin
        [asyncThunk.getAllProductByAdmin.pending]: (state) => {
            state.admin.isLoading = true;
        },
        [asyncThunk.getAllProductByAdmin.fulfilled]: (state, { payload }) => {
            state.admin.isLoading = false;
            state.admin.items = payload.list;
            state.admin.totalPage = payload.totalPage;
        },
        [asyncThunk.getAllProductByAdmin.rejected]: (state, { payload }) => {
            state.admin.message = 'error';
        },
    },
});

export default productsSlice.reducer;
