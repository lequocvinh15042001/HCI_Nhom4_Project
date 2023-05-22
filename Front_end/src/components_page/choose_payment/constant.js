import classNames from 'classnames/bind';
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons';
import { faCcPaypal } from '@fortawesome/free-brands-svg-icons';

import styles from './ChoosePayment.module.scss';

export const cx = classNames.bind(styles);
export const payments = [
    { value: 'cod', name: 'COD', icon: faMoneyBill },
    { value: 'paypal', name: 'Paypal', icon: faCcPaypal },
];
