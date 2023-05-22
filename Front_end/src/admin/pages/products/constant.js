import classNames from 'classnames/bind';
import styles from './Products.module.scss';

export const cx = classNames.bind(styles);

export const context = {
    title: 'Các sản phẩm',
    addButton: '+ Thêm sản phẩm',
};

export const heads = [
    'Hình ảnh',
    'Tên sản phẩm',
    'Giá',
    'Tổng quan',
    'Các hoạt động',
];
