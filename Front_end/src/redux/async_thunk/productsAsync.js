import { createAsyncThunk } from '@reduxjs/toolkit';
import { productServices } from '~/services';

export const getAllProductByClient = createAsyncThunk(
    'products/getAllProductByClient',
    async ({ page, size }, { rejectWithValue }) => {
        try {
            const result = await productServices.getProductsByState({
                page,
                size,
            });
            return result;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);

export const getAllProductByAdmin = createAsyncThunk(
    'products/getAllProductByAdmin',
    async ({ page, size }, { rejectWithValue }) => {
        try {
            const result = await productServices.getProducts({
                page,
                size,
            });
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
