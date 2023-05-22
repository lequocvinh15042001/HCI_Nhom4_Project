import { createAsyncThunk } from '@reduxjs/toolkit';
import { statisticalServices } from '~/services';

export const getStatistical = createAsyncThunk(
    'statistical/getStatistical',
    async ({ from, to, type }, { rejectWithValue }) => {
        try {
            const result = await statisticalServices.getStats({
                from,
                to,
                type,
            });
            const expectMessage = 'Get orders sale successful';

            if (result?.message === expectMessage) {
                const { data } = result;
                return data;
            }
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);
