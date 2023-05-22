import { useRef } from 'react';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    cartActions,
    categoriesSelector,
    modalActions,
    modalSelector,
    userActions,
    userSelector,
} from '~/redux';
import { avatarDefault } from '~/assets/images';

import { context, cx, navItems } from './constant';
import Button from '../button/Button';

function Modal() {
    const isOpen = useSelector(modalSelector.getIsOpen);
    const user = useSelector(userSelector.getUser);
    const categories = useSelector(categoriesSelector.getAllCategory);
    const dispatch = useDispatch();
    const refElement = useRef();

    const handleClickOverlay = (event) => {
        if (refElement.current === event.target) {
            dispatch(modalActions.toggleOpen());
        }
    };
    const handleClickButton = () => dispatch(modalActions.close());
    const handleLogout = () => {
        dispatch(userActions.resetUser());
        dispatch(cartActions.resetCart());
    };

    return (
        <div
            className={cx('wrapper', {
                'wrapper--display': isOpen,
            })}
            onClick={handleClickOverlay}
            ref={refElement}
        >
            <div className={cx('modal')}>
                <div className={cx('title')}>
                    <button
                        className={cx('close-btn')}
                        onClick={handleClickButton}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <Avatar
                        src={user.avatar || avatarDefault}
                        size='60'
                        round='100%'
                        className={cx('avatar')}
                    />
                    <span className={cx('user-name')}>
                        {context.helloUser}
                        {user.name}
                    </span>
                    <div className={cx('wrapper-btn')}>
                        <Button
                            to={user.name ? '/profile' : '/login'}
                            className={cx('btn')}
                        >
                            {user.name ? context.userInfo : context.login}
                        </Button>

                        {user.name ? (
                            <Button
                                className={cx('btn')}
                                onClick={handleLogout}
                            >
                                {context.logout}
                            </Button>
                        ) : (
                            <Button to={'/register'} className={cx('btn')}>
                                {context.register}
                            </Button>
                        )}
                    </div>
                </div>

                <div className={cx('content')}>
                    <div className={cx('section')}>
                        <h2 className={cx('heading-section')}>
                            {context.menu}
                        </h2>
                        <ul className={cx('list')}>
                            {navItems.map((item, index) => (
                                <li key={index} className={cx('item')}>
                                    <Button
                                        reset={true}
                                        to={item.to}
                                        className={cx('item-btn')}
                                    >
                                        <span>{item.name}</span>
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={cx('section')}>
                        <h2 className={cx('heading-section')}>
                            {context.categories}
                        </h2>
                        <ul className={cx('list')}>
                            {categories?.length > 0 &&
                                categories.map((item, index) => (
                                    <li key={index} className={cx('item')}>
                                        <Button
                                            reset={true}
                                            className={cx('item-btn')}
                                        >
                                            {item.name}
                                        </Button>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
