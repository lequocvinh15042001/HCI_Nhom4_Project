import { useState } from 'react';
import parser from 'html-react-parser';
import StarRatings from 'react-star-ratings';

import ReviewForm from '../review_form/ReviewForm';
import ReviewAction from '../review_action/ReviewAction';

import { cx } from './constant';

function Review({ review }) {
    const [isEdit, setIsEdit] = useState(false);

    const color = '#ffc120';
    const handleEdit = () => {
        setIsEdit(true);
    };
    const handleCancel = (event) => {
        event.preventDefault();
        setIsEdit(false);
    };

    return (
        <li className={cx('comment')}>
            <div className={cx('comment-first')}>
                <img
                    src={review.userimage}
                    alt={review.reviewedBy}
                    className={cx('comment-avatar')}
                />
                <div className={cx('comment-name')}>
                    <div>{review.reviewedBy}</div>
                    <StarRatings
                        rating={review.rate}
                        starRatedColor={color}
                        starHoverColor={color}
                        starDimension='12px'
                        starSpacing='2px'
                    />
                </div>
            </div>

            <div className={cx('comment-last')}>
                {isEdit ? (
                    <ReviewForm
                        color={color}
                        review={review}
                        onClickCancel={handleCancel}
                    />
                ) : (
                    <>
                        <div className={cx('comment-content')}>
                            {parser(review.content)}
                        </div>
                        <ReviewAction
                            review={review}
                            onClickEdit={handleEdit}
                        />
                    </>
                )}
            </div>
        </li>
    );
}

export default Review;
