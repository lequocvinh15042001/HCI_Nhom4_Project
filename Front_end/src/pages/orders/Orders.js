import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { OrderItem } from '~/components_page';
import { ordersActions, ordersAsync, ordersSelector } from '~/redux';
import { Loading, Section, Tabs, Title, Wrapper } from '~/components';

import { cx, context, tabs } from './constant';

function Orders() {
    const [tab, setTab] = useState({ content: 'Tất cả', value: '' });
    const dispatch = useDispatch();
    const { items: orders, isLoading } = useSelector(
        ordersSelector.getOrdersClient,
    );

    const handleClickTab = (tab) => setTab(tab);

    useEffect(() => {
        dispatch(ordersAsync.getAllOrder());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        dispatch(ordersActions.filter(tab.value));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tab]);

    return (
        <Wrapper classnames={cx('wrapper')}>
            <div className={cx('grid', 'wide')}>
                {isLoading || (
                    <Section classNames={cx('container')}>
                        <Tabs tabs={tabs} tab={tab} onClick={handleClickTab} />
                    </Section>
                )}
            </div>

            <div className={cx('grid', 'wide')}>
                <Section classNames={cx('container')}>
                    <Title as='h1'>{context.title}</Title>
                </Section>
            </div>

            <div className={cx('grid', 'wide')}>
                <Loading isLoading={isLoading}>
                    {orders.map((order, index) => (
                        <OrderItem key={index} order={order} />
                    ))}
                </Loading>
            </div>
        </Wrapper>
    );
}

export default Orders;
