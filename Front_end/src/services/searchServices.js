import * as request from '~/utils/request';

const searchServices = {
    searchProducts: async ({ q, page, size }) => {
        try {
            const response = await request.get(
                `products/search?q=${q}&page=${page}&size=${size}`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default searchServices;
