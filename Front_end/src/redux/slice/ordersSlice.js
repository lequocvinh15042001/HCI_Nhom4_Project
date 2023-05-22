import { createSlice } from '@reduxjs/toolkit';
import * as asyncThunk from '../async_thunk/ordersAsync';

import { createObjectList } from '~/utils/funcs';

const initialState = {
    client: createObjectList(),
    clientFilter: createObjectList(),
    admin: createObjectList(),
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        filter: (state, { payload }) => {
            const newOrders = state.client.items.filter((item) =>
                payload ? item.state === payload : true,
            );
            state.clientFilter.items = newOrders;
        },
    },
    extraReducers: {
        // getAllOrder
        [asyncThunk.getAllOrder.pending]: (state) => {
            state.client.isLoading = true;
            state.clientFilter.isLoading = true;
        },
        [asyncThunk.getAllOrder.fulfilled]: (state, { payload }) => {
            state.client.isLoading = false;
            state.client.items = payload.list;

            state.clientFilter.isLoading = false;
            state.clientFilter.items = payload.list;
        },
        [asyncThunk.getAllOrder.rejected]: (state, { payload }) => {
            state.client.message = 'error';
        },

        // getAllOrderByAdmin
        [asyncThunk.getAllOrderByAdmin.pending]: (state) => {
            state.admin.isLoading = true;
        },
        [asyncThunk.getAllOrderByAdmin.fulfilled]: (state, { payload }) => {
            state.admin.isLoading = false;
            state.admin.items = payload.list;
            state.admin.totalPage = payload.totalPage;
        },
        [asyncThunk.getAllOrderByAdmin.rejected]: (state, { payload }) => {
            state.admin.message = 'error';
        },

        // getAllOrderEnableByAdmin
        [asyncThunk.getAllOrderEnableByAdmin.pending]: (state) => {
            state.admin.isLoading = true;
        },
        [asyncThunk.getAllOrderEnableByAdmin.fulfilled]: (
            state,
            { payload },
        ) => {
            state.admin.isLoading = false;
            state.admin.items = payload.list;
            state.admin.totalPage = payload.totalPage;
        },
        [asyncThunk.getAllOrderEnableByAdmin.rejected]: (
            state,
            { payload },
        ) => {
            state.admin.message = 'error';
        },
    },
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice.reducer;
