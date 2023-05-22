import * as request from '~/utils/request';

const preflix = 'admin/manage/stats/';
const statisticalServices = {
    getCountByState: async () => {
        try {
            const response = await request.get(`${preflix}state`);
            return response;
        } catch ({
            response: {
                data: { message },
            },
        }) {
            throw message;
        }
    },
    getStats: async ({ from, to, type = 'month' }) => {
        try {
            const response = await request.get(
                `${preflix}orders?from=${from}&to=${to}&type=${type}`,
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
};

export default statisticalServices;
