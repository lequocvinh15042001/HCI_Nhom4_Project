import { Fragment, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { arrayPageItem, cx } from './constant';

function ButtonPagination({ displayPages, totalPage, onClick }) {
    const firstPage = 1;

    const [searchParams, setSearchParams] = useSearchParams();
    const [pages, setPages] = useState([]);
    const [page, setPage] = useState(
        parseInt(searchParams.get('page') || firstPage),
    );

    useEffect(() => {
        setPages(arrayPageItem({ currentPage: page, displayPages, totalPage }));
    }, [page, displayPages, totalPage, searchParams]);

    const handleDecrease = () => {
        setPage((prev) => {
            return prev - 1;
        });

        if (onClick) {
            onClick(page - 1);
        }

        setSearchParams({ page: page - 1 });
    };
    const handleIncrease = () => {
        setPage((prev) => {
            return prev + 1;
        });

        if (onClick) {
            onClick(page + 1);
        }

        setSearchParams({ page: page + 1 });
    };
    const handleSetPage = (value) => {
        setPage(value);

        if (onClick) {
            onClick(value);
        }

        setSearchParams({ page: value });
    };

    if (totalPage > 1) {
        return (
            <div className={cx('pagination')}>
                <button
                    className={cx('btn', { 'btn--disable': page === 1 })}
                    onClick={() => handleSetPage(firstPage)}
                >
                    {'<<'}
                </button>
                <button
                    className={cx('btn', { 'btn--disable': page === 1 })}
                    onClick={handleDecrease}
                >
                    {'<'}
                </button>

                {pages.map((item, index) => (
                    <button
                        key={index}
                        className={cx('btn', {
                            'btn--active': item === page,
                        })}
                        onClick={() => handleSetPage(item)}
                    >
                        {item}
                    </button>
                ))}

                <button
                    className={cx('btn', {
                        'btn--disable': page === totalPage,
                    })}
                    onClick={handleIncrease}
                >
                    {'>'}
                </button>
                <button
                    className={cx('btn', {
                        'btn--disable': page === totalPage,
                    })}
                    onClick={() => handleSetPage(totalPage)}
                >
                    {'>>'}
                </button>
            </div>
        );
    } else {
        <Fragment />;
    }
}

export default ButtonPagination;
