import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useLocation } from 'react-router-dom';

import { pathNames } from '~/routes';
import { cx } from './constant';

function BreadCrumb() {
    const location = useLocation();

    console.log(location);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('grid', 'wide')}>
                <ul className={cx('bread-crumb')}>
                    <li>
                        <NavLink
                            to={pathNames.home}
                            className={cx('bread-crumb-text', 'url')}
                            title='Trang chủ'
                        >
                            Trang chủ
                        </NavLink>
                        <span className={cx('bread-crumb-icon')}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                    </li>
                    <li>
                        <NavLink
                            to={pathNames.search}
                            className={cx('bread-crumb-text', 'url')}
                            title='Raspberry'
                        >
                            Raspberry
                        </NavLink>
                        <span className={cx('bread-crumb-icon')}>
                            <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                    </li>
                    <li>
                        <span className={cx('bread-crumb-text', 'current')}>
                            Module camera OV2640 200W Pixel
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default BreadCrumb;
