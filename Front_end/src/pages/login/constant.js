import * as yup from 'yup';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';

const cx = classNames.bind(styles);

const context = {
    title: 'Đăng nhập tài khoản',
    login: 'Đăng nhập',
    forgotPass: 'Quên mật khẩu',
    passwordPlaceholder: 'Nhập mật khẩu',
    emailPlaceholder: 'Nhập email',
    passwordLabel: 'Mật khẩu',
    emailLabel: 'Email',
    messageSignIn: 'Bạn không có tài khoản. Đăng ký',
    createAcc: 'Tại đây',
};

const form = {
    email: 'email',
    password: 'password',
};

const errorMessage = {
    requiredEmail: 'Vui lòng nhập email',
    email: 'Vui lòng nhập email hợp lệ',
    requiredPassword: 'Vui lòng nhập mật khẩu',
    passwordLengtEight: 'Mật khẩu phải có độ dài tối thiểu 8 ký tự',
};

const minField = 8;

const schema = yup.object({
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

const defaultValues = {
    email: 'cnpmm2022@gmail.com',
    password: '123456789',
};

export { cx, context, form, schema, defaultValues };
