import classNames from 'classnames/bind';
import * as yup from 'yup';

import styles from './Register.module.scss';

const cx = classNames.bind(styles);
const context = {
    title: 'Đăng ký tài khoản',
    register: 'Đăng ký',
    login: 'Đăng nhập',
    name: 'Họ và tên',
    email: 'Email',
    fieldPassword: 'Mật khẩu',
    retypePassword: 'Nhập lại mật khẩu',
    messageSignIn: 'Bạn không có tài khoản. Đăng ký',
    createAcc: 'Tại đây',
};
const placeholder = {
    name: 'Nhập họ và tên của bạn',
    email: 'Nhập email của bạn',
    fieldPassword: 'Nhập mật khẩu của bạn',
    retypePassword: 'Nhập lại mật khẩu',
    messageSignIn: 'Bạn không có tài khoản. Đăng ký',
    createAcc: 'Tại đây',
};
const messageErrors = {
    nameRequired: 'Nhập họ và tên',
    emailRequired: 'Nhập email',
    email: 'Email không hợp lệ',
    passwordRequired: 'Nhập mật khẩu',
    passwordComfirmRequired: 'Nhập mật khẩu',
    leastCharater: 'Tối thiểu 8 ký tự',
    retypePassword: 'Nhập lại mật khẩu chưa chính xác',
};
const schema = yup.object({
    name: yup.string().trim().required(messageErrors.nameRequired),
    email: yup
        .string()
        .email(messageErrors.email)
        .required(messageErrors.emailRequired),
    password: yup
        .string()
        .min(8, messageErrors.leastCharater)
        .required(messageErrors.passwordRequired),
    passwordComfirm: yup
        .string()
        .required(messageErrors.passwordComfirmRequired)
        .oneOf([yup.ref('password'), null], messageErrors.retypePassword),
});

export { cx, context, placeholder, schema };
