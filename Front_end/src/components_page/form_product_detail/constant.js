import classNames from 'classnames/bind';
import styles from './FormProductDetail.module.scss';

export const cx = classNames.bind(styles);

export const context = {
    quantity: 'Số lượng: ',
    empty: 'Hết hàng',
    addToCart: 'Thêm vào giỏ hàng',
};

export const form = {
    quantity: 'quantity',
};
