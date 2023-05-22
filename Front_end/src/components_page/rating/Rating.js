import StarRatings from 'react-star-ratings';

import { cx, context } from './constant';

function Rating({ rating }) {
    const color = '#ffc120';
    const maxStars = 5;
    const averageRating = () => {
        if (rating.quantity) {
            return rating.totalStar / rating.quantity;
        } else return 0;
    };

    return (
        <div className={cx('rating')}>
            <StarRatings
                starRatedColor={color}
                starDimension='12px'
                starSpacing='2px'
                rating={averageRating()}
                numberOfStars={maxStars}
            />
            <span className={cx('rating-title')}>{context.ratingText}</span>
        </div>
    );
}

export default Rating;
