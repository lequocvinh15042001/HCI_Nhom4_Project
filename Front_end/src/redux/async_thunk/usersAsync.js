import { createAsyncThunk } from '@reduxjs/toolkit';
import { userServices } from '~/services';

export const getUsers = createAsyncThunk(
    'users/getUsers',
    async ({ page, size }, { rejectWithValue }) => {
        try {
            const result = await userServices.getUsers({
                page,
                size,
            });

            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
