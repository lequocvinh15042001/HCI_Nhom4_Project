import classNames from 'classnames/bind';
import * as yup from 'yup';
import styles from './LoginAdmin.module.scss';

const errorMessage = {
    requiredEmail: 'Vui lòng nhập email',
    email: 'Vui lòng nhập email hợp lệ',
    requiredPassword: 'Vui lòng nhập mật khẩu',
    passwordLengtEight: 'Mật khẩu phải có độ dài tối thiểu 8 ký tự',
};

const minField = 8;

export const cx = classNames.bind(styles);
export const context = {
    title: 'Đăng nhập tài khoản',
    login: 'Đăng nhập',
    emailLabel: 'Nhập email',
    passwordLabel: 'Nhập mật khẩu',
};
export const form = {
    email: 'email',
    password: 'password',
};
export const schema = yup.object({
    email: yup
        .string()
        .trim()
        .required(errorMessage.requiredEmail)
        .email(errorMessage.email),
    password: yup
        .string()
        .required(errorMessage.requiredPassword)
        .min(minField, errorMessage.passwordLengtEight),
});
export const defaultValues = {
    email: 'admin@gmail.com',
    password: 'admin123',
};
