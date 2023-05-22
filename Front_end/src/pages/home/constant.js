import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

const context = {
    cateogriesTitle: 'Danh mục',
    latestProduct: 'Sản phẩm mới nhất',
    titleControl: 'Vi điều khiển - Nhúng',
    titleTool: 'Dụng cụ - phụ kiện',
    viewMoreButton: 'Xem thêm',
    viewMoreText: 'Xem tất cả',
    loginSuccess: 'Đăng nhập thành công',
};

export { cx, context };
