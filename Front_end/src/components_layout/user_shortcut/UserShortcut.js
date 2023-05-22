import { useSelector } from 'react-redux';
import {
    faHomeAlt,
    faArrowRightToBracket,
    faUserPen,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react/headless';

import { Button } from '~/components';
import { userSelector } from '~/redux';

import { cx, context } from './constant';

import UserDropdown from '../user_dropdown/UserDropdown';

function UserShortcut() {
    const { avatar, name } = useSelector(userSelector.getUser);

    return (
        <ul className={cx('wrapper')}>
            <li className={cx('item')}>
                <Button className={cx('item__btn')} reset={true} to={'/'}>
                    <FontAwesomeIcon
                        className={cx('item__icon')}
                        icon={faHomeAlt}
                    />
                    <span className={cx('item__content')}>{context.home}</span>
                </Button>
            </li>
            {!!name || (
                <li className={cx('item')}>
                    <Button
                        className={cx('item__btn')}
                        reset={true}
                        to={'/login'}
                    >
                        <FontAwesomeIcon
                            className={cx('item__icon')}
                            icon={faArrowRightToBracket}
                        />
                        <span className={cx('item__content')}>
                            {context.login}
                        </span>
                    </Button>
                </li>
            )}

            {!!name || (
                <li className={cx('item')}>
                    <Button
                        className={cx('item__btn')}
                        reset={true}
                        to={'/register'}
                    >
                        <FontAwesomeIcon
                            className={cx('item__icon')}
                            icon={faUserPen}
                        />
                        <span className={cx('item__content')}>
                            {context.register}
                        </span>
                    </Button>
                </li>
            )}

            {!!name && (
                <li className={cx('item', 'item--non-hover')}>
                    <Tippy
                        render={(attrs) => <UserDropdown {...attrs} />}
                        placement='bottom-end'
                        trigger='click'
                        interactive='true'
                    >
                        <button className={cx('item__btn')}>
                            <img
                                className={cx('item__avatar')}
                                src={avatar}
                                alt={name}
                                height={26}
                                width={26}
                            />
                            <span className={cx('item__content')}>{name}</span>
                        </button>
                    </Tippy>
                </li>
            )}
        </ul>
    );
}

export default UserShortcut;
