import classNames from 'classnames/bind';
import styles from './Section.module.scss';

const cx = classNames.bind(styles);

function Section({ children }) {
    return <div className={cx('section')}>{children}</div>;
}

export default Section;
