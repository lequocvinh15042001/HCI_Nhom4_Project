import { Fragment } from 'react';

import { Section } from '~/components';
import { currencyVN } from '~/utils/funcs';
import { enumStateOrder } from '~/utils/constant';
import { ButtonCustomize } from '~/admin/components';

import { cx, context } from './constant';

function OrderItem({ order }) {
    if (order.state === 'enable') {
        return <Fragment />;
    } else {
        return (
            <Section classNames={cx('section')}>
                <div className={cx('info')}>
                    <div className={cx('info__section')}>
                        <span className={cx('bold-text')} title={order.id}>
                            {context.orderId(order.id)}
                        </span>
                        <span className={cx('tag', `tag--${order.state}`)}>
                            {enumStateOrder[order.state].state}
                        </span>
                    </div>
                    <div className={cx('info__section')}>
                        <span className={cx('normal-text', 'info__summary')}>
                            {context.summaryItems(order.items)}
                        </span>
                    </div>
                    <div className={cx('info__section')}>
                        <span className={cx('normal-text')}>
                            {order.createdDate}
                        </span>
                        <span className={cx('normal-text')}>
                            {currencyVN(order.totalPrice)}
                        </span>
                    </div>
                </div>

                <div className={cx('view')}>
                    <ButtonCustomize isEdit={true} to={`/order/${order.id}`}>
                        {context.orderDetail}
                    </ButtonCustomize>
                </div>
            </Section>
        );
    }
}

export default OrderItem;
