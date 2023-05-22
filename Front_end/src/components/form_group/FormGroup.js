import classNames from 'classnames/bind';
import styles from './FormGroup.module.scss';

const cx = classNames.bind(styles);

function FormGroup({ children, classes, name, label, errors, isRequired }) {
    return (
        <div className={classes}>
            <div className={cx('group')}>
                <label htmlFor={name} className={cx('label-input')}>
                    {label}
                    <span>{isRequired && ' *'}</span>
                </label>
                {children}
            </div>
            <span className={cx('invalid-message')}>
                {errors && errors[name]?.message}
            </span>
        </div>
    );
}

export default FormGroup;
