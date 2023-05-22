import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { pathNames } from '~/routes';
import { cartActions, userActions } from '~/redux';

import styles from './UserDropdown.module.scss';

const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return () => {
        dispatch(userActions.resetUser());
        dispatch(cartActions.resetCart());
        navigate(pathNames.login);
    };
};

export const cx = classNames.bind(styles);

export const menu = [
    [
        {
            content: 'Tài khoản của tôi',
            path: '/profile',
        },
        {
            content: 'Đơn hàng',
            path: '/orders',
        },
        {
            content: 'Đổi mật khẩu',
            path: '/change-password',
        },
    ],
    [
        {
            content: 'Đăng xuất',
            onclick: useLogout,
        },
    ],
];
