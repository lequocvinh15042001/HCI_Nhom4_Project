import classNames from 'classnames/bind';
import * as yup from 'yup';

import styles from './Profile.module.scss';

const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

export const cx = classNames.bind(styles);

export const context = {
    title: 'Hồ sơ của tôi',
    name: 'Họ và tên',
    avataButton: 'Chọn ảnh',
    email: 'Email',
    phone: 'Số điện thoại',
    editButton: 'Lưu',
};

export const schema = yup.object({
    name: yup.string().required('Nhập họ và tên'),
    email: yup.string().required('Email đang không có sẵn'),
    phone: yup.string().matches(phoneRegExp, 'Số điện thoại không đúng'),
});
