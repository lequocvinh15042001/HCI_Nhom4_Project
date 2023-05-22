import * as request from '~/utils/request';

const reviewSerview = {
    adminGetReviews: async ({ page, size }) => {
        try {
            const response = await request.get(
                `admin/manage/comment/findall?page=${page}&size=${size}`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getReviewByProductId: async (id) => {
        try {
            const response = await request.get(`comment/${id}`);
            return response.data;
        } catch ({
            response: {
                data: { message },
            },
        }) {
            throw message;
        }
    },
    addReview: async (data) => {
        try {
            const response = await request.post('comment', data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    editReview: async ({ id, data }) => {
        try {
            const response = await request.put(`comment/edit/${id}`, data);
            return response;
        } catch (error) {
            throw error;
        }
    },
    blockReview: async ({ id }) => {
        try {
            const response = await request.requestDelete(
                `admin/manage/comment/block/${id}`,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },
    unblockReview: async ({ id }) => {
        try {
            const response = await request.put(
                `admin/manage/comment/setenable/${id}`,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },
    deleteReviewByUser: async ({ id }) => {
        try {
            const response = await request.requestDelete(
                `comment/deletebyuser/${id}`,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },
};

export default reviewSerview;
