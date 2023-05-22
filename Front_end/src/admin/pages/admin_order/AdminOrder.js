import Swal from 'sweetalert2';
import Avatar from 'react-avatar';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, Title } from '~/components';
import { enumStateOrder } from '~/utils/constant';
import { ButtonCustomize } from '~/admin/components';
import { avatarDefault } from '~/assets/images';
import { currencyVN, priceSaleVN } from '~/utils/funcs';
import { userServices, orderServices } from '~/services';

import { cx, context } from './constant';

function AdminOrder() {
    const [order, setOrder] = useState();
    const [user, setUser] = useState();
    const [orderState, setOrderState] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApi = async ({ id }) => {
            const resultOrder = await orderServices.adminGetOrderById({ id });
            setOrder(resultOrder);

            const state = enumStateOrder[resultOrder.state];
            setOrderState(state[resultOrder.paymentType]);

            const resultUser = await userServices.getUserById({
                id: resultOrder.userId,
            });
            setUser(resultUser);
        };
        fetchApi({ id });
    }, [id]);

    const handleCancel = () => {
        Swal.fire({
            title: 'Bạn muốn hủy đơn hàng',
            confirmButtonText: 'Xác nhận',
            showCancelButton: true,
            cancelButtonText: 'Bỏ qua',
        }).then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                const expectMessage = 'Cancel order successfully';
                const result = await orderServices.adminCancelOrderById({ id });
                if (result?.message === expectMessage) {
                    Swal.fire({
                        title: 'Hủy đơn hàng thành công',
                        icon: 'success',
                        confirmButtonText: 'Xác nhận',
                        allowOutsideClick: false,
                    }).then(({ isConfirmed }) => {
                        if (isConfirmed) {
                            navigate(0);
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'Hủy đơn hàng thất bại',
                        icon: 'error',
                        confirmButtonText: 'Xác nhận',
                        allowOutsideClick: false,
                    }).then(({ isConfirmed }) => {
                        if (isConfirmed) {
                            navigate(0);
                        }
                    });
                }
            }
        });
    };

    const handleDelivery = () => {
        Swal.fire({
            title: 'Bạn muốn xác nhận đơn hàng',
            confirmButtonText: 'Xác nhận',
            showCancelButton: true,
            cancelButtonText: 'Bỏ qua',
        }).then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                const expectMessage = 'Delivery order successfully';
                const result = await orderServices.adminDeliveryOrderById({
                    id,
                });
                if (result?.message === expectMessage) {
                    Swal.fire({
                        title: 'Xác nhận đơn hàng thành công',
                        icon: 'success',
                        confirmButtonText: 'Xác nhận',
                        allowOutsideClick: false,
                    }).then(({ isConfirmed }) => {
                        if (isConfirmed) {
                            navigate(0);
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'Xác nhận đơn hàng thất bại',
                        icon: 'error',
                        confirmButtonText: 'Xác nhận',
                        allowOutsideClick: false,
                    }).then(({ isConfirmed }) => {
                        if (isConfirmed) {
                            navigate(0);
                        }
                    });
                }
            }
        });
    };

    const handleComplete = () => {
        Swal.fire({
            title: 'Xác nhận giao hàng thành công',
            confirmButtonText: 'Xác nhận',
            showCancelButton: true,
            cancelButtonText: 'Bỏ qua',
        }).then(async ({ isConfirmed }) => {
            if (isConfirmed) {
                const expectMessage = 'Complete order successfully';
                const result = await orderServices.adminCompletelOrderById({
                    id,
                });
                if (result?.message === expectMessage) {
                    Swal.fire({
                        title: 'Đã xác nhận đơn hàng',
                        icon: 'success',
                        confirmButtonText: 'Xác nhận',
                        allowOutsideClick: false,
                    }).then(({ isConfirmed }) => {
                        if (isConfirmed) {
                            navigate(0);
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'Xác nhận đơn hàng thất bại',
                        icon: 'error',
                        confirmButtonText: 'Xác nhận',
                        allowOutsideClick: false,
                    }).then(({ isConfirmed }) => {
                        if (isConfirmed) {
                            navigate(0);
                        }
                    });
                }
            }
        });
    };

    return (
        <>
            <Title as='h1'>{context.title}</Title>
            <Button to={'/admin/orders'}>{context.backToPage}</Button>

            <div className={cx('row')} style={{ margin: '28px 0' }}>
                <div className={cx('col', 'l-4')}>
                    <Avatar
                        src={user?.avatar || avatarDefault}
                        size='200'
                        alt='avatar'
                        round='100%'
                    />

                    <Title as='h2' classNames={cx('user-name')}>
                        {context.userName}
                        {user?.name}
                    </Title>
                </div>

                <div className={cx('col', 'l-8')}>
                    <div className={cx('row')}>
                        {/* Name order */}
                        <div className={cx('col', 'l-12')}>
                            <span className={cx('large-text')}>
                                {context.shipName}
                                {order?.userName}
                            </span>
                        </div>

                        {/* Phone */}
                        <div className={cx('col', 'l-12')}>
                            {order?.delivery && (
                                <span className={cx('large-text')}>
                                    {context.phone}
                                    {order?.phone}
                                </span>
                            )}
                        </div>

                        {/* Delivery */}
                        <div className={cx('col', 'l-12')}>
                            {order?.delivery && (
                                <span className={cx('large-text')}>
                                    {context.address(order?.delivery)}
                                </span>
                            )}
                        </div>

                        {/* Method payment */}
                        <div className={cx('col', 'l-12')}>
                            <span className={cx('large-text')}>
                                {context.methodPay}
                                {order?.paymentType}
                            </span>
                        </div>

                        {/* State payment */}
                        {order?.paymentType && order?.state && (
                            <div className={cx('col', 'l-12')}>
                                <span className={cx('large-text')}>
                                    {context.status}
                                    {orderState.isPay}
                                </span>
                            </div>
                        )}

                        {/* Total price */}
                        <div className={cx('col', 'l-6')}>
                            <span className={cx('large-text')}>
                                {context.total}
                            </span>
                        </div>
                        {order?.totalPrice && (
                            <div className={cx('col', 'l-6')}>
                                <span
                                    className={cx(
                                        'large-text',
                                        'large-text--blue',
                                    )}
                                >
                                    {currencyVN(order?.totalPrice)}
                                </span>
                            </div>
                        )}

                        {orderState.isCancel && (
                            <div
                                className={cx('col', 'l-4')}
                                style={{ marginTop: '1.2rem' }}
                            >
                                <ButtonCustomize
                                    isDelete={true}
                                    onClick={handleCancel}
                                >
                                    {context.cancelButton}
                                </ButtonCustomize>
                            </div>
                        )}

                        {orderState.isDelivery && (
                            <div
                                className={cx('col', 'l-4')}
                                style={{ marginTop: '1.2rem' }}
                            >
                                <ButtonCustomize
                                    isRead={true}
                                    onClick={handleDelivery}
                                >
                                    {context.deliveryButton}
                                </ButtonCustomize>
                            </div>
                        )}

                        {orderState.isComplete && (
                            <div
                                className={cx('col', 'l-4')}
                                style={{ marginTop: '1.2rem' }}
                            >
                                <ButtonCustomize
                                    isEdit={true}
                                    onClick={handleComplete}
                                >
                                    {context.completeButton}
                                </ButtonCustomize>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Title as='h2'>{context.titleListProduct}</Title>

            <ul className={cx('products')}>
                {order?.items.map((item, index) => (
                    <li key={index} className={cx('product')}>
                        <span className={cx('quantity')}>{item.quantity}</span>
                        <div className={cx('info')}>
                            <img
                                src={item.image[0].url}
                                alt={item.name}
                                className={cx('img')}
                            />
                            <Title as='h3'>{item.name}</Title>
                        </div>
                        {item?.price && (
                            <span className={cx('text')}>
                                {currencyVN(
                                    priceSaleVN(item?.price, item?.sale),
                                )}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default AdminOrder;
