import classNames from 'classnames/bind';
import styles from './Orders.module.scss';

export const cx = classNames.bind(styles);

export const context = {
    title: 'Đơn hàng gần nhất',
};

export const tabs = [
    { content: 'Tất cả', value: '' },
    { content: 'Đã thanh toán', value: 'pendingpay' },
    { content: 'Đang xử lý', value: 'pending' },
    { content: 'Đang vận chuyển', value: 'delivery' },
    { content: 'Hoàn thành', value: 'complete' },
    { content: 'Đã hủy', value: 'cancel' },
];
