import classNames from 'classnames/bind';
import * as yup from 'yup';
import styles from './SendOtp.module.scss';

const errorMessage = {
    requiredEmail: 'Vui lòng nhập email',
    email: 'Vui lòng nhập email hợp lệ',
};

export const cx = classNames.bind(styles);
export const context = {
    title: 'Gửi OTP',
    subTitle:
        'Bạn quên mật khẩu? Nhập địa chỉ email để lấy lại mật khẩu qua email.',
    emailLabel: 'Nhập email',
    button: 'Gửi otp',
};
export const form = {
    email: 'email',
};
export const schema = yup.object({
    email: yup
        .string()
        .trim()
        .required(errorMessage.requiredEmail)
        .email(errorMessage.email),
});
export const defaultValues = {
    email: '',
};
