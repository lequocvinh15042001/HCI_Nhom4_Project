import { Link } from 'react-router-dom';

import { currencyVN, priceSaleVN } from '~/utils/funcs';
import { cx } from './constant';

function ProductCard({ product }) {
    const percent = 100;
    const priceSale = priceSaleVN(product.price, product.sale);

    return (
        <Link
            to={`/product/${product.id}`}
            className={cx('product')}
            title={product.name}
        >
            {product.sale !== 0 && (
                <span className={cx('label-sale')}>
                    <span>{product.sale * percent}%</span> Giảm
                </span>
            )}
            <div className={cx('wrapper-img')}>
                <img
                    className={cx('product-img')}
                    src={product?.images[0]?.url}
                    alt={product.name}
                />
            </div>
            <div className={cx('product-wrapper')}>
                <div className={cx('product-right')}>
                    <div>
                        <span className={cx('product-name')}>
                            {product.name}
                        </span>
                    </div>
                    <div>
                        {product.sale !== 0 && (
                            <span className={cx('product-price')}>
                                {currencyVN(product.price)}
                            </span>
                        )}
                        <span className={cx('product-price-sale')}>
                            {currencyVN(priceSale)}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
