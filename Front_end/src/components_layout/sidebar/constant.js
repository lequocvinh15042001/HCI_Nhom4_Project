import classNames from 'classnames/bind';
import {
    faBox,
    faRectangleList,
    faAddressCard,
    faReceipt,
    faTableCells,
} from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-regular-svg-icons';

import styles from './Sidebar.module.scss';

export const cx = classNames.bind(styles);

export const sidebarItems = [
    {
        context: 'Thống kê',
        navTo: '/admin/dashboard',
        icon: faTableCells,
    },
    {
        context: 'Các sản phẩm',
        navTo: '/admin/products',
        icon: faBox,
    },
    {
        context: 'Các danh mục',
        navTo: '/admin/categories',
        icon: faRectangleList,
    },
    {
        context: 'Danh sách đơn hàng',
        navTo: '/admin/orders',
        icon: faReceipt,
    },
    {
        context: 'Danh sách người dùng',
        navTo: '/admin/users',
        icon: faAddressCard,
    },
    {
        context: 'Danh sách đánh giá',
        navTo: '/admin/reviews',
        icon: faMessage,
    },
];
