// import logger from '~/utils/logger';
import * as request from '~/utils/request';

// const pathName = 'src/services/productServices';

const productServices = {
    getProducts: async ({ page, size }) => {
        try {
            const response = await request.get(
                `products?page=${page}&size=${size}`,
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getProductsByCategory: async ({ id, page, size }) => {
        // const selector = '> productServices > getProductsByCategory';

        try {
            const response = await request.get(
                `products/category/${id}?page=${page}&size=${size}`,
            );

            return response.data;
        } catch ({
            response: {
                data: { message },
            },
        }) {
            // logger({
            //     groupName: `${pathName} ${selector}`,
            //     values: [message],
            // });

            throw message;
        }
    },
    getProductsByState: async ({ page, size }) => {
        try {
            const response = await request.get(
                `products/byStateEnable/?page=${page}&size=${size}`,
            );

            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getProduct: async (id) => {
        try {
            const response = await request.get(`products/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    addProduct: async (data) => {
        try {
            const response = await request.post('products/add', data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    editProduct: async ({ id, data }) => {
        try {
            const response = await request.put(`products/update/${id}`, data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    deleteProduct: async (id) => {
        try {
            const response = await request.requestDelete(
                `products/delete/${id}`,
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    restoreProduct: async (id) => {
        try {
            const response = await request.put(`products/setstateenable/${id}`);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    addImagesProduct: async ({ id, data }) => {
        try {
            const response = await request.post(
                `products/uploadimage/${id}`,
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
    deleteImageProduct: async ({ id, idImage }) => {
        try {
            const response = await request.requestDelete(
                `products/deleteimage/${id}/${idImage}`,
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    addOptionProduct: async ({ id, data }) => {
        try {
            const response = await request.post(
                `manage/products/option/${id}`,
                data,
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    editOptionProduct: async ({ id, data }) => {
        try {
            const response = await request.put(
                `manage/products/option/${id}`,
                data,
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    deleteOptionProduct: async (id) => {
        try {
            const response = await request.requestDelete(`manage/delete/${id}`);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default productServices;
