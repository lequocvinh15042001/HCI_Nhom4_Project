import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { cartAsync } from '~/redux';
import { cartServices } from '~/services';
import { InputQuantity } from '~/components';
import { currencyVN, priceSaleVN } from '~/utils/funcs';

import { cx, context } from './constant';
// import logger from '~/utils/logger';

function CartItem({ product }) {
    const dispatch = useDispatch();
    const preflixSearch = '/search?category=';
    const linkBtn = product.stock
        ? `/product/${product.productid}`
        : `${preflixSearch}${product.categoryId}`;

    // Handle event
    const handleChange = async (isAddition, number) => {
        if (number < 1) {
            return;
        }
        const { productid: producId, productOptionid, value, stock } = product;

        if (stock && number > stock) {
            toast.error(`Số lượng không vượt quá ${stock}`);
            return;
        }

        const result = await cartServices.addCart({
            producId,
            productOptionId: productOptionid || null,
            value,
            quantity: isAddition ? 1 : -1,
        });
        const expectMessage = `Update product ${
            productOptionid ? productOptionid : 'null'
        } in cart success`;

        if (result?.message === expectMessage) {
            dispatch(cartAsync.getCartByToken());
        } else {
            toast.error('Không thể thêm hoặc giảm số lượng');
        }
    };
    const handleDelete = (id) => {
        const title = `Bạn có chắc xóa ${product.name}`;

        Swal.fire({
            title,
            confirmButtonText: 'Xác nhận',
            showCancelButton: true,
            cancelButtonText: 'Hủy',
        }).then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                const result = await cartServices.deleteCart(id);
                const expectMessage = `Delete item ${id} in cart success`;

                if (result?.message === expectMessage) {
                    dispatch(cartAsync.getCartByToken());
                } else {
                    toast.error('Xóa sản phẩm khỏi giỏ hàng thất bại');
                }
            }
        });
    };

    return (
        <li className={cx('cart-item')}>
            <div className={cx('col', 'l-3', 'm-2', 's-3')}>
                <img
                    src={product.image[0].url}
                    alt={product.name}
                    className={cx('cart-item__image')}
                />
            </div>
            <div className={cx('col', 'l-7', 'm-8', 's-6')}>
                <div className={cx('cart-item__info')}>
                    <div className={cx('cart-item--mobile')}>
                        <Link to={linkBtn} style={{ textDecoration: 'none' }}>
                            <h3 className={cx('cart-item__name')}>
                                {product.stock
                                    ? product.name
                                    : context.emtyStock}
                            </h3>
                        </Link>

                        <span
                            className={cx('delete-text')}
                            onClick={() => handleDelete(product.itemId)}
                        >
                            {context.delete}
                        </span>
                    </div>

                    {!!product.stock && (
                        <span className={cx('cart-item__price')}>
                            {currencyVN(
                                priceSaleVN(product.price, product.sale),
                            )}
                        </span>
                    )}

                    <span
                        className={cx('delete-text', 'delete-text--mobile')}
                        onClick={() => handleDelete(product.itemId)}
                    >
                        {context.delete}
                    </span>
                </div>
            </div>

            <div className={cx('col', 'l-2', 'm-2', 's-3')}>
                {!!product.stock && (
                    <InputQuantity
                        startNumber={product.quantity}
                        small
                        onSpecial={(isAddition, value) =>
                            handleChange(isAddition, value)
                        }
                    />
                )}
                <span
                    className={cx({
                        'invalid-message': !product.quantity,
                    })}
                >
                    {!product.quantity && context.errorMessage}
                </span>
            </div>
        </li>
    );
}

export default CartItem;
