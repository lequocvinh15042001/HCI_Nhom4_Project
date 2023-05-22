import classNames from 'classnames/bind';
import * as yup from 'yup';
import styles from './ChangePassword.module.scss';

export const cx = classNames.bind(styles);
export const context = {
    title: 'Thay đổi mật khẩu',
    oldPassword: 'Mật khẩu cũ',
    newPassword: 'Mật khẩu mới',
    changePasswordButton: 'Đổi mật khẩu',
};
export const messageErrors = {
    oldPasswordRequired: 'Nhập mật khẩu cũ',
    newPasswordRequired: 'Nhập mật khẩu mới',
    leastCharater: 'Tối thiểu 8 ký tự',
};
export const schema = yup.object({
    oldPassword: yup.string().required(messageErrors.oldPasswordRequired),
    newPassword: yup
        .string()
        .min(8, messageErrors.leastCharater)
        .required(messageErrors.newPasswordRequired),
});
