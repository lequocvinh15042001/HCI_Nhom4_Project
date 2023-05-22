import * as request from '~/utils/request';

const paymentServices = {
    postPayment: async ({ cartId, type, data }) => {
        try {
            const response = await request.post(
                `checkout/${type}/${cartId}`,
                data,
            );
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default paymentServices;
