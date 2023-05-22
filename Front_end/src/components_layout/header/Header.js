import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBasketShopping } from '@fortawesome/free-solid-svg-icons';

import { pathNames } from '~/routes';
import { Button, LogoSVG } from '~/components';
import { cartAsync, cartSelector, modalActions, userSelector } from '~/redux';
import logger from '~/utils/logger';

import SearchBar from '../search_bar/SearchBar';
import UserShortcut from '../user_shortcut/UserShortcut';

import { cx } from './constant';

function Header() {
    const dispatch = useDispatch();
    const totalProduct = useSelector(cartSelector.getTotalProduct);
    const { accessToken } = useSelector(userSelector.getUser);

    useEffect(() => {
        if (accessToken) {
            dispatch(cartAsync.getCartByToken());
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Handle event
    const handleClickMenu = () => dispatch(modalActions.open());

    logger({ groupName: 'Header', values: ['re-render'] });

    return (
        <header className={cx('header')}>
            <div className={cx('grid', 'wide')}>
                <div className={cx('wrapper')}>
                    <div
                        className={cx(
                            'wrapper-section',
                            'wrapper-section--grow',
                        )}
                    >
                        <Button
                            className={cx('menu-btn')}
                            onClick={handleClickMenu}
                        >
                            <FontAwesomeIcon
                                className={cx('menu-btn__icon')}
                                icon={faBars}
                            />
                        </Button>

                        <Button
                            reset={true}
                            to={pathNames.home}
                            className={cx('logo')}
                        >
                            <LogoSVG />
                        </Button>

                        <SearchBar />
                    </div>

                    <div className={cx('wrapper-section')}>
                        <UserShortcut />

                        <div className={cx('wrapper-cart-icon')}>
                            <Button
                                to={pathNames.cart}
                                className={cx('cart-icon')}
                            >
                                <FontAwesomeIcon icon={faBasketShopping} />
                                <span>{totalProduct}</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
