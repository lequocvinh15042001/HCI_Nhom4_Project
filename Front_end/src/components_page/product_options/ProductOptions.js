import PropTypes from 'prop-types';

import { cx, context } from './constant';

function ProductOptions({ options, onChange, value }) {
    const handleClick = (index, option) => {
        if (onChange) {
            onChange({ ...option, index });
        }
    };

    return (
        <>
            <span className={cx('section-title')}>
                {!!options.length && context.title}
            </span>
            <ul className={cx('options')}>
                {value &&
                    options.map((option, index) => (
                        <li key={index} className={cx('option')}>
                            <span
                                htmlFor={option.value}
                                className={cx('option__label', {
                                    'option--checked': value.index === index,
                                })}
                                onClick={() => handleClick(index, option)}
                            >
                                {option.value}
                            </span>
                        </li>
                    ))}
            </ul>

            <span>{value?.stock ? `${value?.stock} sản phẩm có sẵn` : ''}</span>
        </>
    );
}

ProductOptions.propTypes = {
    options: PropTypes.array,
};

export default ProductOptions;
