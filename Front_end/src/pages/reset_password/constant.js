import classNames from 'classnames/bind';
import * as yup from 'yup';
import styles from './ResetPassword.module.scss';

const errorMessage = {
    requiredPassword: 'Vui lòng nhập mật khẩu',
    passwordLengtEight: 'Mật khẩu phải có độ dài tối thiểu 8 ký tự',
};
const minField = 8;

export const cx = classNames.bind(styles);
export const context = {
    title: 'Đặt lại mật khẩu',
    passwordLabel: 'Nhập mật khẩu mới',
    button: 'Đặt lại mật khẩu',
};
export const form = {
    password: 'password',
};
export const schema = yup.object({
    password: yup
        .string()
        .required(errorMessage.requiredPassword)
        .min(minField, errorMessage.passwordLengtEight),
});
export const defaultValues = {
    password: '',
};
