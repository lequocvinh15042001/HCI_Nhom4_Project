import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ReviewItem } from '~/admin/components_pages';
import { reviewsAsync, reviewsSelector } from '~/redux';
import { ButtonPagination, Table, Title } from '~/components';

import { cx, context, heads } from './constant';
import { useSearchParams } from 'react-router-dom';

function Reviews() {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const {
        items: reviews,
        isLoading,
        totalPage,
    } = useSelector(reviewsSelector.getReviewsByAdmin);

    const itemPerPage = 5;
    const displayPages = 4;
    const firstPage = 1;
    const currentPage = searchParams.get('page') || firstPage;

    useEffect(() => {
        dispatch(
            reviewsAsync.getReviewsByAdmin({
                page: currentPage - 1,
                size: itemPerPage,
            }),
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    return (
        <>
            <Title as='h1'>{context.title}</Title>

            {/* <div className={cx('search')}>
                <input type='text' className={cx('input-search')} />
                <Button className={cx('button-search')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </Button>
            </div> */}

            <Table classes={cx('table')} heads={heads} isLoading={isLoading}>
                {reviews.map((item, index) => (
                    <ReviewItem
                        key={index}
                        review={item}
                        callback={() =>
                            dispatch(reviewsAsync.getReviewsByAdmin())
                        }
                    />
                ))}
            </Table>

            <ButtonPagination
                currentPage={searchParams.get('page') || firstPage}
                displayPages={displayPages}
                totalPage={totalPage}
            />
        </>
    );
}

export default Reviews;
