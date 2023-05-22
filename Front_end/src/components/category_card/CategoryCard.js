import classNames from 'classnames/bind';
import { Button } from '~/components';
import styles from './CategoryCard.module.scss';

const cx = classNames.bind(styles);

function CategoryCard({ category }) {
    return (
        <Button to={`search?category=${category.id}`} className={cx('card')}>
            <div className={cx('card__image')}>
                <img src={category.categoryimage} alt={category.name} />
            </div>
            <span className={cx('card__name')}>{category.name}</span>
        </Button>
    );
}

export default CategoryCard;
