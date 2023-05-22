import { createSlice } from '@reduxjs/toolkit';
import { createObjectList } from '~/utils/funcs';
import * as asyncThunk from '../async_thunk/usersAsync';

const admin = createObjectList();
const initialState = {
    id: '',
    email: '',
    name: '',
    avatar: '',
    address: '',
    phone: '',
    role: '',
    accessToken: '',
    isToast: true,
    admin,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser(state, { payload }) {
            state.id = payload.id;
            state.email = payload.email;
            state.name = payload.name;
            state.avatar = payload.avatar;
            state.address = payload.address;
            state.phone = payload.phone;
            state.role = payload.role;
            state.accessToken = payload.accessToken;
        },
        updateUser(state, { payload }) {
            state.name = payload.name;
            state.phone = payload.phone;

            if (payload.avatar) {
                state.avatar = payload.avatar;
            }
        },
        showedToast(state) {
            state.isToast = false;
        },
        resetUser(state) {
            state.id = '';
            state.email = '';
            state.name = '';
            state.avatar = '';
            state.address = '';
            state.phone = '';
            state.role = '';
            state.accessToken = '';
            state.isToast = true;
        },
    },
    extraReducers: {
        [asyncThunk.getUsers.pending]: (state) => {
            state.admin.isLoading = true;
        },
        [asyncThunk.getUsers.fulfilled]: (state, { payload }) => {
            state.admin.isLoading = false;
            state.admin.items = payload.list;
            state.admin.totalPage = payload.totalPage;
        },
        [asyncThunk.getUsers.rejected]: (state, { payload }) => {
            state.admin.message = '';
        },
    },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
