import * as request from '~/utils/request';

const orderServices = {
    adminGetAllOrder: async (page) => {
        try {
            const response = await request.get(
                `admin/manage/orders?page=${page}&size=10`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    adminGetAllOrderEnable: async (page) => {
        try {
            const response = await request.get(
                `admin/manage/ordersEnable?page=${page}&size=10`,
            );
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    adminGetOrderById: async ({ id }) => {
        try {
            const response = await request.get(`admin/manage/orders/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    userGetAllOrder: async () => {
        try {
            const response = await request.get(`orders/getallorder`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    userGetOrderById: async ({ id }) => {
        try {
            const response = await request.get(`orders/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    userGetOrdersComplete: async () => {
        try {
            const response = await request.get(`orders/getallordercomplete`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    adminCancelOrderById: async ({ id }) => {
        try {
            const response = await request.put(
                `admin/manage/orders/setcancel/${id}`,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },
    adminDeliveryOrderById: async ({ id }) => {
        try {
            const response = await request.put(
                `admin/manage/orders/setdelivery/${id}`,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },
    adminCompletelOrderById: async ({ id }) => {
        try {
            const response = await request.put(
                `admin/manage/orders/setcomplete/${id}`,
            );
            return response;
        } catch (error) {
            throw error;
        }
    },
    userCancelOrderById: async ({ id }) => {
        try {
            const response = await request.put(`orders/cancel/${id}`);
            return response;
        } catch ({
            response: {
                data: { message },
            },
        }) {
            throw message;
        }
    },
};

export default orderServices;
