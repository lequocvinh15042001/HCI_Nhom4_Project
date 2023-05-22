import classNames from 'classnames/bind';
import styles from './Addresses.module.scss';

export const cx = classNames.bind(styles);

export const context = {
    lastName: 'Họ:',
    firstName: 'Tên:',
    editAddressBtn: 'Chỉnh sửa địa chỉ',
    deleteAddressBtn: 'Xóa',
    name: 'Tên tài khoản:',
    address: 'Địa chỉ:',
    address2: 'Địa chỉ 2:',
    city: 'Thành phố:',
    phone: 'Số điện thoại:',
    default: 'Địa chỉ mặc định',
};
