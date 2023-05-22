import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '~/components';

import { actions, cx } from './constant';

function Actions() {
    const totalProduct = 0;

    return (
        <div className={cx('wrapper-actions')}>
            {actions.map((item, index) => (
                <Button
                    reset={true}
                    key={index}
                    className={cx('action-item')}
                    to={item.to}
                    href={item.href}
                >
                    <FontAwesomeIcon
                        className={cx('action-item__icon')}
                        icon={item.icon}
                    />
                    <div>
                        <span className={cx('action-item__context')}>
                            {item.context === 'Sản phẩm'
                                ? `(${totalProduct}) ${item.context}`
                                : item.context}
                        </span>
                        <span className={cx('action-item__title')}>
                            {item.title}
                        </span>
                    </div>
                </Button>
            ))}
        </div>
    );
}

export default Actions;
