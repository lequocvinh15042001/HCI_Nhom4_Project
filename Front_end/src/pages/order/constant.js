import classNames from 'classnames/bind';
import styles from './Order.module.scss';

export const cx = classNames.bind(styles);
export const context = {
    title: 'Đơn hàng',
    titleListProduct: 'Thông tin đơn hàng',
    status: 'Trạng thái: ',
    recipientName: 'Người nhận: ',
    phone: 'Số điện thoại: ',
    methodPay: 'Thanh toán: ',
    address: ({ shipAddress, shipProvince, shipDistrict, shipWard }) => {
        return `Địa chỉ: ${shipAddress}, ${shipProvince}, ${shipDistrict}, ${shipWard}`;
    },
    total: 'Tổng tiền',
    cancelButton: 'Hủy đơn hàng',
};
