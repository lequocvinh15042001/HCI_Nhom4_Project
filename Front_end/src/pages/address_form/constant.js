import classNames from 'classnames/bind';
import * as yup from 'yup';

import styles from './AddressForm.module.scss';

export const cx = classNames.bind(styles);

export const context = {
    lastName: 'Họ',
    firstName: 'Tên',
    address: 'Địa chỉ',
    address2: 'Địa chỉ 2',
    city: 'Thành phố',
    phone: 'Số điện thoại',
    setDefault: 'Đặt làm địa chỉ mặc định?',
    addAddressBtn: 'Thêm địa chỉ',
    cancelBtn: 'Hủy',
};

export const placeholder = {
    address: 'Nhập địa chỉ của bạn',
    phone: 'Nhập số điện thoại của bạn',
};

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const schema = yup.object({
    address: yup.string().trim().required(),
    phone: yup
        .string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required(),
});
