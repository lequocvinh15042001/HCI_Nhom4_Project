import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ButtonPagination, Table, Title } from '~/components';
import { currencyVN } from '~/utils/funcs';
import { ButtonCustomize } from '~/admin/components';
import { enumStateOrder } from '~/utils/constant';

import { context, cx, heads } from './constant';
import { useSearchParams } from 'react-router-dom';
import { ordersAsync, ordersSelector } from '~/redux';

function AdminOrders() {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {
        items: orders,
        totalPage,
        isLoading,
    } = useSelector(ordersSelector.getOrdersAdmin);

    const displayPages = 5;
    const firstPage = 1;

    useEffect(() => {
        const currentPage = searchParams.get('page') || firstPage;

        dispatch(ordersAsync.getAllOrderEnableByAdmin(currentPage - 1));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    return (
        <Fragment>
            <Title as='h1'>{context.title}</Title>

            <Table classes={cx('table')} heads={heads} isLoading={isLoading}>
                {orders.map((order, index) => (
                    <tr key={index}>
                        <td className={cx('td-id')} title={order.id}>
                            {order.id}
                        </td>
                        <td className={cx('td-name')}>{order.userName}</td>
                        <td>{order.lastModifiedDate || order.createdDate}</td>
                        <td className={cx('td-total')}>
                            {currencyVN(order.totalPrice)}
                        </td>
                        <td>
                            <span className={cx(order.state)}>
                                {enumStateOrder[order.state].state}
                            </span>
                        </td>
                        <td>
                            <ButtonCustomize
                                to={`/admin/order/${order.id}`}
                                isEdit={true}
                            >
                                <FontAwesomeIcon icon={faEye} />
                            </ButtonCustomize>
                        </td>
                    </tr>
                ))}
            </Table>

            <ButtonPagination
                currentPage={searchParams.get('page') || 1}
                displayPages={displayPages}
                totalPage={totalPage}
            />
        </Fragment>
    );
}

export default AdminOrders;
