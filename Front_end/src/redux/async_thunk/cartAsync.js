import { createAsyncThunk } from '@reduxjs/toolkit';
import { cartServices } from '~/services';

export const getCartByToken = createAsyncThunk(
    'cart/getCartByToken',
    async (params, { rejectWithValue }) => {
        try {
            const result = await cartServices.getCartByToken();
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
