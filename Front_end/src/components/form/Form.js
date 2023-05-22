import classNames from 'classnames/bind';
import styles from './Form.module.scss';

const cx = classNames.bind(styles);

function Form({ children, classes, onSubmit }) {
    return (
        <form className={cx('form', classes)} onSubmit={onSubmit}>
            <div className={cx('row')}>{children}</div>
        </form>
    );
}

export default Form;
