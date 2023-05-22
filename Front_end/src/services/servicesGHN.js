import * as request from '~/utils/requestGHN';

const servicesGHN = {
    getProvince: async () => {
        try {
            const response = await request.get('master-data/province');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getDistrict: async (id) => {
        try {
            const response = await request.get('master-data/district', {
                params: { province_id: id },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getWard: async (id) => {
        try {
            const response = await request.get('master-data/ward', {
                params: { district_id: id },
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    getFee: async ({
        to_ward_code,
        to_district_id,
        service_id,
        service_type_id,
    }) => {
        const data = {
            from_district_id: 1442,
            to_ward_code,
            to_district_id,
            service_id,
            service_type_id,
            // height: 50,
            // length: 20,
            weight: 200,
            // width: 20,
            insurance_value: 100000,
            coupon: null,
        };

        try {
            const response = await request.post('v2/shipping-order/fee', data);
            console.log(response);
            return response.data.total;
        } catch (error) {
            console.log(error);
        }
    },
    getService: async (to_district) => {
        const data = {
            shop_id: 120624,
            from_district: 1442,
            to_district,
        };

        try {
            const response = await request.post(
                'v2/shipping-order/available-services',
                data,
            );
            return response.data[0];
        } catch (error) {
            console.log(error);
        }
    },
};

export default servicesGHN;
