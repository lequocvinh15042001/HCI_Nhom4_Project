import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input({
    name,
    type,
    textarea,
    rows,
    cols,
    isDisable,
    classes,
    register,
    errors,
    placeholder,
}) {
    let Component = 'input';

    if (textarea) {
        Component = 'textarea';
    }

    return (
        <Component
            type={type}
            inputMode={'numeric'}
            className={cx('input-text', {
                'invalid-input': !!errors[name]?.message,
                'input-number': type === 'number',
                [classes]: classes,
            })}
            placeholder={placeholder}
            disabled={isDisable}
            rows={rows}
            cols={cols}
            onWheel={(e) => {
                if (type === 'number') {
                    e.target.blur();
                }
            }}
            {...register(name)}
        />
    );
}

Input.propTypes = {
    errors: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};

export default Input;
