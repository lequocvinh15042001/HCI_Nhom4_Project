import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';

export const cx = classNames.bind(styles);

export const context = {
    errorMessage: 'Nhập số lượng không hợp lệ',
    emtyStock: 'Sản phẩm đã hết, xem các sản phẩm tương tự',
    delete: 'Xóa',
};
