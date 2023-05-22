import classNames from 'classnames/bind';
import styles from './Users.module.scss';

export const cx = classNames.bind(styles);
export const context = {
    title: 'Danh sách người dùng',
};
export const heads = [
    'ID',
    'Tên người dùng',
    'Email',
    'Vai trò',
    'Các hoạt động',
];
