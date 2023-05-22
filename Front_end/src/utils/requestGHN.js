import axios from 'axios';

const requestGHN = axios.create({
    baseURL: 'https://dev-online-gateway.ghn.vn/shiip/public-api/',
    headers: {
        token: '548f57d1-600e-11ed-b8cc-a20ef301dcd7',
        ShopId: 120624,
    },
});

export const get = async (path, options = {}) => {
    const response = await requestGHN.get(path, options);
    return response.data;
};

export const post = async (path, options = {}) => {
    const response = await requestGHN.post(path, options);
    return response.data;
};
