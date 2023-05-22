import * as request from '~/utils/request';

const authServices = {
    login: async (data) => {
        try {
            const response = await request.post('auth/login', data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    register: async (data) => {
        try {
            const response = await request.post('auth/register', data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    registerSendMail: async (data) => {
        try {
            const response = await request.post('auth/registersendmail', data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    verifyOtp: async (data) => {
        try {
            const response = await request.post('auth/verify', data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    getOtpReset: async (data) => {
        try {
            const response = await request.post(
                `auth/getotpreset?email=${data.email}`,
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
    getOtp: async ({ email }) => {
        try {
            const response = await request.post(`auth/getotp?email=${email}`);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default authServices;
