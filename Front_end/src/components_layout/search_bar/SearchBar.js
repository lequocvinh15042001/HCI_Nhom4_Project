import { useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { pathNames } from '~/routes';
import styles from './SearchBar.module.scss';

const cx = classNames.bind(styles);

function SearchBar() {
    const [searchParams] = useSearchParams();
    const [inputSearch, setInputSearch] = useState(searchParams.get('q') || '');
    const navigate = useNavigate();
    const pathname = pathNames.search;

    // - Handle search
    const handleChangeSearch = ({ target: { value } }) => setInputSearch(value);
    const handleClickSearch = () => {
        navigate({ pathname, search: `?q=${inputSearch}` });
    };
    const handleKeyDown = ({ key }) => {
        switch (key) {
            case 'Enter':
                navigate({
                    pathname,
                    search: `?q=${inputSearch}`,
                });
                break;

            default:
                break;
        }
    };
    const handleFocus = ({ target }) => {
        target.select();
    };

    return (
        <div className={cx('wrapper-input')}>
            <input
                className={cx('input')}
                placeholder='Tìm kiếm sản phẩm...'
                value={inputSearch}
                onChange={handleChangeSearch}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
            />
            <button className={cx('btn-search')} onClick={handleClickSearch}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </div>
    );
}

export default SearchBar;
