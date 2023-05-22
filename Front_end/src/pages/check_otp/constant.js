import classNames from 'classnames/bind';
import * as yup from 'yup';
import styles from './CheckOtp.module.scss';

const errorMessage = {
    requiredOtp: 'Vui lòng nhập otp',
    typeErrorOtp: 'Giá trị phải là số',
};

export const cx = classNames.bind(styles);
export const context = {
    title: 'Nhập otp tại đây',
    otpLabel: 'Nhập otp',
    button: 'Xác nhận otp',
};
export const form = {
    otp: 'otp',
};
export const schema = yup.object({
    otp: yup
        .number()
        .typeError(errorMessage.typeErrorOtp)
        .required(errorMessage.requiredOtp),
});
export const defaultValues = {
    otp: '',
};
