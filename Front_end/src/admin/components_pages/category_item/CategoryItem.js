import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen } from '@fortawesome/free-solid-svg-icons';

import { Button } from '~/components';

import styles from './CategoryItem.module.scss';

const cx = classNames.bind(styles);

function CategoryItem({ category, onSetState }) {
    const handleSetState = (category) => {
        if (onSetState) {
            onSetState(category);
        }
    };

    return (
        <>
            <td>
                {category?.categoryimage && (
                    <img
                        className={cx('image-category')}
                        src={category?.categoryimage}
                        alt={category.name}
                    />
                )}
            </td>
            <td>{category.name}</td>
            <td>{category.state}</td>
            <td>
                <Button
                    to={`/admin/category-form/${category.id}`}
                    solid={true}
                    className={cx('btn', 'btn--edit')}
                >
                    <FontAwesomeIcon icon={faPen} />
                </Button>
                <Button
                    solid={true}
                    className={cx('btn', 'btn--check')}
                    onClick={() => handleSetState(category)}
                >
                    <FontAwesomeIcon icon={faCircleCheck} />
                </Button>
            </td>
        </>
    );
}

export default CategoryItem;
