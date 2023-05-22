import { pathNames } from '~/routes';
import { currencyVN } from '~/utils/funcs';
import Button from '~/components/button/Button';

import CartItem from '../cart_item/CartItem';
import { context, cx } from './constant';
import { useMemo } from 'react';

function MainCart({ cart }) {
    const isDisable = useMemo(() => {
        return cart.items.some((item) => !item.stock);
    }, [cart.items]);

    return (
        <div className={cx('row', 'no-gutters')}>
            <div className={cx('col', 'l-9', 'm-12', 's-12')}>
                <h1 className={cx('title')}>{context.title}</h1>
                <span>
                    ({cart.items.length} {context.product})
                </span>

                <ul className={cx('carts')}>
                    {cart.items.map((item, index) => (
                        <CartItem key={index} product={item} />
                    ))}
                </ul>
            </div>
            <div className={cx('col', 'l-3', 'm-12', 's-12')}>
                <div className={cx('wrapper-total')}>
                    <div className={cx('price-info')}>
                        <span className={cx('text')}>{context.total}</span>
                        <span className={cx('price')}>
                            {currencyVN(cart.totalPrice)}
                        </span>
                    </div>
                    <div className={cx('section-btn')}>
                        <Button
                            solid
                            fullWidth
                            disable={isDisable}
                            to={pathNames.checkout}
                        >
                            {context.buyNow}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainCart;
