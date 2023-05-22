import { useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';

import { Section, Wrapper } from '~/components';
import { cartAsync, cartSelector } from '~/redux';
import { EmptyCart, MainCart } from '~/components_page';

import { cx } from './constant';

function Cart() {
    const dispatch = useDispatch();
    const cart = useSelector(cartSelector.getCart);

    useEffect(() => {
        dispatch(cartAsync.getCartByToken());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Wrapper>
            <div className={cx('grid', 'wide')}>
                {cart.isLoading ? (
                    <TailSpin
                        width='100%'
                        height='80'
                        color='#4fa94d'
                        ariaLabel='tail-spin-loading'
                        radius='1'
                        wrapperStyle={{}}
                        wrapperClass=''
                        visible={true}
                    />
                ) : (
                    <Section>
                        {cart.items.length ? (
                            <MainCart cart={cart} />
                        ) : (
                            <EmptyCart />
                        )}
                    </Section>
                )}
            </div>
        </Wrapper>
    );
}

export default Cart;
