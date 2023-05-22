import classNames from 'classnames/bind';
import * as yup from 'yup';
import styles from './CheckOtpRegister.module.scss';

const errorMessage = {
    requiredEmail: 'Vui lòng nhập email',
    email: 'Vui lòng nhập email hợp lệ',
    requiredOtp: 'Vui lòng nhập otp',
    typeErrorOtp: 'Giá trị phải là số',
};

export const cx = classNames.bind(styles);
export const context = {
    title: 'Nhập otp tại đây',
    emailLabel: 'Nhập email',
    otpLabel: 'Nhập otp',
    reSend: 'Gửi lại otp',
    verify: 'Xác nhận otp',
};
export const form = {
    email: 'email',
    otp: 'otp',
};
export const schema = yup.object({
    email: yup
        .string()
        .trim()
        .required(errorMessage.requiredEmail)
        .email(errorMessage.email),
    otp: yup
        .number()
        .typeError(errorMessage.typeErrorOtp)
        .required(errorMessage.requiredOtp),
});
