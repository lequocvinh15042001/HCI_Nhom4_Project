import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

export const cx = classNames.bind(styles);

export const navItems = [
    { name: 'Trang chủ', to: '/' },
    { name: 'Theo dõi đơn hàng', to: '/orders' },
];

export const context = {
    helloUser: 'Xin chào ',
    login: 'Đăng nhập',
    userInfo: 'Thông tin',
    register: 'Đăng ký',
    logout: 'Đăng xuất',
    menu: 'Danh mục',
    categories: 'Danh mục sản phẩm',
};
