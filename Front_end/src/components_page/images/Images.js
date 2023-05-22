import classNames from 'classnames/bind';
import { useState } from 'react';
import { Slick } from '~/components';

import styles from './Images.module.scss';

const cx = classNames.bind(styles);

function Images({ images }) {
    const [indexSelect, setIndexSelect] = useState(0);

    const handleSelect = (index) => setIndexSelect(index);

    const Image = ({ image, index }) => {
        return (
            <img
                className={cx('product-img', {
                    'product-img--active': indexSelect === index,
                })}
                src={image?.url}
                alt={image?.id_image}
            />
        );
    };

    return (
        <>
            <div className={cx('wrapper-image')}>
                <div
                    className={cx('product-img-select')}
                    style={{
                        backgroundImage: `url(${images[indexSelect]?.url})`,
                    }}
                ></div>
            </div>

            <Slick
                list={images}
                component={Image}
                nameProp={'image'}
                large={'3'}
                medium={''}
                small={''}
                onClick={({ index }) => handleSelect(index)}
                isActive
            />
        </>
    );
}

export default Images;
