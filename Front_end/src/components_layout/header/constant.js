import classNames from 'classnames/bind';
import styles from './Header.module.scss';

export const cx = classNames.bind(styles);

export const navItems = [
    { name: 'Trang chủ', to: '/' },
    { name: 'Theo dõi đơn hàng', to: '/orders' },
];

export const context = {
    categories: 'Danh mục sản phẩm',
};
