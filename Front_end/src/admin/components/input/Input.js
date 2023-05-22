import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input({ errors, register, name, type, placeholder, ...props }) {
    return (
        <input
            type={type}
            inputMode={'numeric'}
            className={cx('input-text', {
                'invalid-input': !!errors[name]?.message,
                'input-number': type === 'number',
            })}
            placeholder={placeholder}
            {...register(name)}
            {...props}
        />
    );
}

Input.propTypes = {
    errors: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
};

export default Input;
