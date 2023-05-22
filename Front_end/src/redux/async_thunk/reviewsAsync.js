import { createAsyncThunk } from '@reduxjs/toolkit';
import { reviewServices } from '~/services';

export const getReviewsByAdmin = createAsyncThunk(
    'reviews/getReviewsByAdmin',
    async ({ page, size }, { rejectWithValue }) => {
        try {
            const result = await reviewServices.adminGetReviews({ page, size });
            return result;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
);
