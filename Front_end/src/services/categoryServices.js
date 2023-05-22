// import logger from '~/utils/logger';
import * as request from '~/utils/request';

// Cateogry/Categories
const categoryServices = {
    getCategories: async () => {
        try {
            const response = await request.get('categories');
            return response.data;
        } catch ({ response: { data } }) {
            throw data;
        }
    },
    getCategoryById: async (id) => {
        try {
            const response = await request.get(`categories/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getCategoriesRoleAdmin: async () => {
        try {
            const response = await request.get('admin/manage/categories');
            return response.data;
        } catch ({ repsonse: data }) {
            return data;
        }
    },
    addCategory: async (data) => {
        try {
            const response = await request.post(
                'admin/manage/categories',
                data,
            );
            return response;
        } catch ({
            response: {
                data: { message },
            },
        }) {
            throw message;
        }
    },
    updateCategory: async (id, data) => {
        try {
            const response = await request.put(
                `admin/manage/categories/${id}`,
                data,
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    updateImageCategory: async (id, data) => {
        try {
            const response = await request.post(
                `admin/manage/categories/uploadimage/${id}`,
                data,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                },
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default categoryServices;
