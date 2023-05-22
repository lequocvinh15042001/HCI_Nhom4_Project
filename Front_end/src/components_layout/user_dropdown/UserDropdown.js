import { Button } from '~/components';

import { cx, menu } from './constant';

function UserDropdown() {
    return (
        <ul className={cx('menu')}>
            {menu.map((list, memuIndex) => (
                <li className={cx('menu__item')} key={memuIndex}>
                    <ul className={cx('list')}>
                        {list.map((item, index) => (
                            <li className={cx('list__item')} key={index}>
                                <Button
                                    className={cx('list__button')}
                                    reset={true}
                                    to={item.path}
                                    onClick={item?.onclick && item?.onclick()}
                                >
                                    <span>{item.content}</span>
                                </Button>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
}

export default UserDropdown;
