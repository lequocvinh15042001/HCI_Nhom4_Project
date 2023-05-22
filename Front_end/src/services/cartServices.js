import * as request from '~/utils/request';

const cartServices = {
    getCartByToken: async () => {
        try {
            const response = await request.get('cart');
            return response;
        } catch ({
            response: {
                data: { message },
            },
        }) {
            throw message;
        }
    },
    addCart: async (data) => {
        try {
            const response = await request.post('cart', data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    deleteCart: async (itemCartId) => {
        try {
            const response = await request.requestDelete(
                `cart/delete/${itemCartId}`,
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default cartServices;
