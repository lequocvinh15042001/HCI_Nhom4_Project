import classNames from 'classnames/bind';

import { pathNames } from '~/routes';
import { emptyCart } from '~/assets/images';
import { Button, Title } from '~/components';

import styles from './EmptyCart.module.scss';

const cx = classNames.bind(styles);

function EmptyCart() {
    return (
        <div className={cx('row')}>
            <div className={cx('col', 'l-12', 'm-12', 's-12')}>
                <img
                    className={cx('empty-cart__image')}
                    src={emptyCart}
                    alt='empty-cart'
                />
            </div>
            <div className={cx('col', 'l-12', 'm-12', 's-12')}>
                <Title as='h2' center>
                    Giỏ hàng của bạn còn trống
                </Title>
            </div>
            <div
                className={cx(
                    'col',
                    'l-12',
                    'm-12',
                    's-12',
                    'empty-cart__button',
                )}
            >
                <Button to={pathNames.home}>Tiếp tục mua hàng</Button>
            </div>
        </div>
    );
}

export default EmptyCart;
