import { createAsyncThunk } from '@reduxjs/toolkit';
import { categoryServices } from '~/services';

export const getAllCategory = createAsyncThunk(
    'categories/getAllCategory',
    async (params, { rejectWithValue }) => {
        try {
            const result = await categoryServices.getCategories();
            return result;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    },
);

export const getAllCategoryByAdmin = createAsyncThunk(
    'categories/getAllCategoryByAdmin',
    async (params, { rejectWithValue }) => {
        try {
            const result = await categoryServices.getCategoriesRoleAdmin();
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
