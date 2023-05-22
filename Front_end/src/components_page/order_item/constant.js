import classNames from 'classnames/bind';
import styles from './OrderItem.module.scss';

export const cx = classNames.bind(styles);
export const context = {
    orderId: (id) => `Mã đơn hàng: ${id}`,
    summaryItems: (items) => {
        if (items.length > 1) {
            return `${items[0].name} ...và ${items.length - 1} sản phẩm khác.`;
        } else {
            return `${items[0].name}.`;
        }
    },
    dataAddress: ({ shipAddress, shipProvince, shipDistrict, shipWard }) => {
        return `${shipAddress}, ${shipProvince}, ${shipDistrict}, ${shipWard}`;
    },
    orderDetail: 'Xem chi tiết',
};
