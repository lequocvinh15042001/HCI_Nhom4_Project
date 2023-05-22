import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';

const cx = classNames.bind(styles);

const context = {
    idProduct: 'Mã sản phẩm:',
    quantity: 'Số lượng',
    addToCart: 'Thêm vào giỏ hàng',
    buyNow: 'Mua ngay',
    tags: 'Tags:',
    description: 'Mô tả sản phẩm',
    relation: 'Sản phẩm cùng loại',
    review: (quantity) => `Đánh giá sản phẩm (${quantity} đánh giá)`,
    reviewButton: 'Đánh giá sản phẩm',
    notifyReview:
        'Vui lòng đặt hàng và thanh toán để có thể đánh giá sản phẩm này',
};

const form = {
    quantity: 'quantity',
};

export { cx, context, form };
