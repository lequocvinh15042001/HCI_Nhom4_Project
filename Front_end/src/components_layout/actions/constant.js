import classNames from 'classnames/bind';
import { faBasketShopping, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';

import styles from './Actions.module.scss';

export const cx = classNames.bind(styles);

export const actions = [
    {
        icon: faBasketShopping,
        context: 'Sản phẩm',
        title: 'Giỏ hàng',
        to: '/cart',
    },
    {
        icon: faPhone,
        context: '0326574849',
        title: 'Hỗ trợ',
        to: '',
        href: 'tel:0326574849',
    },
    {
        icon: faClock,
        context: '8:00 AM - 5:00 PM',
        title: 'Thời gian làm việc',
        to: '',
        href: '',
    },
];
