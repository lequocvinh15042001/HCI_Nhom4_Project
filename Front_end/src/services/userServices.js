import * as request from '~/utils/request';

const userServices = {
    getUser: async (id) => {
        try {
            const response = await request.get(`users/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    updateUser: async (id, data) => {
        try {
            const response = await request.put(`users/${id}`, data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    uploadAvatar: async (id, data) => {
        try {
            const response = await request.post(`users/avatar/${id}`, data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    resetPassword: async (id, data) => {
        try {
            const response = await request.put(
                `users/resetpassword/${id}`,
                data,
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    adminBlockUserById: async ({ id }) => {
        try {
            const response = await request.requestDelete(
                `admin/manage/users/${id}`,
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    adminUnblockUserById: async ({ id }) => {
        try {
            const response = await request.put(
                `admin/manage/users/unblockuser/${id}`,
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    adminSetRoleUserById: async ({ id, data }) => {
        try {
            const response = await request.put(
                `admin/manage/users/setrole/${id}`,
                data,
            );
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    getUsers: async ({ page, size = 5 }) => {
        try {
            const response = await request.get(
                `admin/manage/users?page=${page}`,
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getUserById: async ({ id }) => {
        try {
            const response = await request.get(`/users/${id}`);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    changePassword: async (id, data) => {
        try {
            const response = await request.put(`users/password/${id}`, data);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
};

export default userServices;
