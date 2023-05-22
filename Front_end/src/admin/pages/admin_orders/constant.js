import classNames from 'classnames/bind';
import styles from './AdminOrders.module.scss';

export const cx = classNames.bind(styles);

export const context = {
    title: 'Các đơn hàng',
};

export const heads = [
    'Mã đơn hàng',
    'Tên người đặt',
    'Ngày đặt',
    'Tổng tiền',
    'Trạng thái',
    'Xem chi tiết',
];
