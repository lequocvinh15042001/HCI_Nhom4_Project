import classNames from 'classnames/bind';
import styles from './Reviews.module.scss';

export const cx = classNames.bind(styles);
export const context = {
    title: 'Các đánh giá sản phẩm',
    idReviewCol: 'Mã đánh giá',
    lastUpdateCol: 'Lần cuối chỉnh sửa',
    productNameCol: 'Tên sản phẩm',
    userNameCol: 'Tên người dùng',
    stateCol: 'Trạng thái',
    actionsCol: 'Các hoạt động',
};
export const heads = [
    'Mã đánh giá',
    'Tên người dùng',
    'Tên sản phẩm',
    'Lần cuối chỉnh sửa',
    'Các hoạt động',
];
